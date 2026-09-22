import { NextResponse } from "next/server";
import { z } from "zod";
import { leadSchema, sorteoSchema, SORTEO_FUENTE } from "@/lib/lead-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendLeadToGhl, type GhlLead } from "@/lib/ghl";
import { siteConfig } from "@/config/site";

const bodySchema = z.union([
  sorteoSchema.extend({ fuente: z.literal(SORTEO_FUENTE) }),
  leadSchema.extend({ fuente: z.string().max(60).default("desconocida") }),
]);

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

async function sendEmail(lead: GhlLead): Promise<"sent" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "skipped";

  const lines = Object.entries(lead)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `<p><strong>${key}:</strong> ${escapeHtml(String(value))}</p>`)
    .join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "leads@rrallservices.com",
      to: process.env.LEAD_TO_EMAIL || siteConfig.email,
      reply_to: lead.email,
      subject: `Nueva solicitud — ${lead.nombre} ${lead.apellido}`,
      html: `<h2>Nueva solicitud desde el sitio</h2>${lines}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Resend respondió ${response.status}: ${await response.text()}`);
  }
  return "sent";
}

export async function POST(request: Request) {
  const { allowed } = checkRateLimit(clientIp(request));
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtelo en un minuto." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // GHL es el CRM (contacto + oportunidad) y el correo avisa a la dueña. Basta
  // con que un canal reciba el lead para no perderlo.
  const lead = parsed.data;
  const results = await Promise.allSettled([sendLeadToGhl(lead), sendEmail(lead)]);
  const failures = results.filter((r) => r.status === "rejected");
  failures.forEach((failure) => console.error("[lead] entrega fallida", failure.reason));

  if (results.some((r) => r.status === "fulfilled" && r.value === "sent")) {
    return NextResponse.json({ ok: true });
  }
  if (failures.length) {
    return NextResponse.json({ error: "No pudimos registrar su solicitud." }, { status: 502 });
  }

  // ponytail: sin GHL_PRIVATE_INTEGRATION ni RESEND_API_KEY (entorno local) el
  // lead solo queda en los logs del servidor.
  console.info("[lead]", JSON.stringify(lead));
  return NextResponse.json({ ok: true });
}
