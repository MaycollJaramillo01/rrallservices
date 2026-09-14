import type { LeadSchemaType } from "@/lib/lead-schema";

// Entrega de leads de los formularios propios (/contacto y home) a GoHighLevel.
// Solo se usa desde /api/leads. El token es GHL_PRIVATE_INTEGRATION, sin prefijo
// NEXT_PUBLIC_, así que Next nunca lo incluye en el bundle del navegador.
// Los IDs de abajo identifican la subcuenta y no son secretos.
const API = "https://services.leadconnectorhq.com";
const LOCATION_ID = "BehR3gdBL4V3ftAhMlq7";
const PIPELINE_ID = "CRD8jCunXLxcucZAvLtV";
const STAGE_NUEVO_PROSPECTO = "fe78654c-f6e9-47a2-b1b5-cc907c7b350e";
const FIELD = {
  fuente: "RN2yhPQ9iHEbi5S2KHSw",
  mensaje: "h7BVNHNiXzaMhU0RZwEK",
  producto: "6mml1ucgTmCKg8YC6SUB",
};

// Slug del catálogo → opción del campo "Producto de interes" en GHL.
// ponytail: si se renombran las opciones en GHL, actualizar aquí; si no
// coinciden, el campo queda vacío y el producto sigue en la nota.
const productOptions: Record<string, string> = {
  frescaflow: "Royal Prestige FrescaFlow",
  frescapure: "FrescaPure Shower Filter",
  "bateria-de-cocina": "Bateria de cocina Royal Prestige",
  "extractor-de-jugos": "Extractor de jugos Royal Prestige",
  cuchilleria: "Cuchilleria y accesorios Royal Prestige",
  "filtracion-aire": "Sistema de filtracion de aire Royal Prestige",
  otros: "Otro",
};

export type GhlLead = LeadSchemaType & { fuente: string };

// 10 dígitos → número de EE. UU. en formato E.164; el resto se deja para que
// GHL lo interprete con el país de la subcuenta.
function toE164(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone.trim().startsWith("+") ? `+${digits}` : digits;
}

export async function sendLeadToGhl(
  lead: GhlLead,
  fetchImpl: typeof fetch = fetch,
): Promise<"sent" | "skipped"> {
  const token = process.env.GHL_PRIVATE_INTEGRATION;
  if (!token) return "skipped";

  const call = async <T>(method: string, path: string, body?: unknown): Promise<T> => {
    const response = await fetchImpl(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      throw new Error(
        `GHL ${method} ${path} respondió ${response.status}: ${await response.text()}`,
      );
    }
    return (await response.json()) as T;
  };

  const producto = lead.productoInteres ? productOptions[lead.productoInteres] : undefined;

  const { contact } = await call<{ contact: { id: string } }>("POST", "/contacts/upsert", {
    locationId: LOCATION_ID,
    firstName: lead.nombre,
    lastName: lead.apellido,
    email: lead.email,
    phone: toE164(lead.telefono),
    source: "Website",
    customFields: [
      { id: FIELD.fuente, field_value: "Website" },
      ...(lead.mensaje ? [{ id: FIELD.mensaje, field_value: lead.mensaje }] : []),
      ...(producto ? [{ id: FIELD.producto, field_value: producto }] : []),
    ],
  });

  // Añadir etiquetas por su endpoint no borra las que el contacto ya tenía.
  const tags = [`website-${lead.fuente.replace(/^pagina-/, "")}`];
  if (lead.consentimientoSms) tags.push("sms-consentimiento-web");
  await call("POST", `/contacts/${contact.id}/tags`, { tags });

  // La nota conserva cada mensaje; el campo personalizado solo guarda el último.
  const note = [
    `Solicitud desde el sitio web (${lead.fuente})`,
    lead.motivo && `Motivo: ${lead.motivo}`,
    lead.productoInteres && `Producto: ${producto ?? lead.productoInteres}`,
    lead.mensaje && `Mensaje: ${lead.mensaje}`,
    `Acepta SMS: ${lead.consentimientoSms ? "sí" : "no"}`,
  ]
    .filter(Boolean)
    .join("\n");
  await call("POST", `/contacts/${contact.id}/notes`, { body: note });

  // Clientes existentes no entran al embudo de venta. Al resto se le abre una
  // oportunidad en "01 Nuevo Prospecto" solo si no tiene ya una abierta, para
  // no hacer retroceder una que el equipo haya avanzado.
  if (lead.motivo !== "cliente") {
    const { opportunities } = await call<{ opportunities: unknown[] }>(
      "GET",
      `/opportunities/search?location_id=${LOCATION_ID}&pipeline_id=${PIPELINE_ID}&contact_id=${contact.id}&status=open`,
    );
    if (!opportunities.length) {
      await call("POST", "/opportunities/", {
        locationId: LOCATION_ID,
        pipelineId: PIPELINE_ID,
        pipelineStageId: STAGE_NUEVO_PROSPECTO,
        contactId: contact.id,
        name: `${lead.nombre} ${lead.apellido} - Website`,
        status: "open",
        source: "Website",
      });
    }
  }

  return "sent";
}
