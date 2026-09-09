import { NextResponse } from "next/server";
import { z } from "zod";
import { leadSchema } from "@/lib/lead-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/config/site";

const bodySchema = leadSchema.extend({
  fuente: z.string().max(60).default("desconocida"),
});

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

async function deliver(lead: Record<string, string | undefined>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || siteConfig.email;

  // ponytail: sin API key el lead solo queda en los logs del servidor.
  // Configure RESEND_API_KEY + LEAD_FROM_EMAIL para recibirlo por correo.
  if (!apiKey) {
    console.info("[lead]", JSON.stringify(lead));
    return;
  }

  const lines = Object.entries(lead)
    .filter(([, value]) => value)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "leads@rrallservices.com",
      to,
      reply_to: lead.email,
      subject: `Nueva solicitud — ${lead.nombre} ${lead.apellido}`,
      html: `<h2>Nueva solicitud desde el sitio</h2>${lines}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend respondió ${response.status}: ${await response.text()}`);
  }
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

  try {
    await deliver(parsed.data);
  } catch (error) {
    console.error("[lead] entrega fallida", error);
    return NextResponse.json({ error: "No pudimos registrar su solicitud." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
