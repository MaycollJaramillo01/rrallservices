// Verifica cómo /api/leads habla con GHL, sin tocar la cuenta real: se inyecta
// un fetch falso que registra las llamadas. Uso: `npm run check:ghl`.
// ponytail: sin framework de test; si cambia la lógica de src/lib/ghl.ts, esto debe fallar.
import assert from "node:assert/strict";
import { sendLeadToGhl } from "../src/lib/ghl.ts";

const lead = {
  nombre: "Ana",
  apellido: "Prueba",
  email: "ana@example.com",
  telefono: "(929) 555-0100",
  productoInteres: "frescaflow",
  motivo: "informacion",
  mensaje: "Quiero información del FrescaFlow",
  consentimiento: true,
  consentimientoSms: true,
  fuente: "pagina-contacto",
};

function fakeGhl({ openOpportunities = [], conversations = [{ id: "cv1" }], failOn } = {}) {
  const calls = [];
  const fetch = async (url, init) => {
    const path = url.replace("https://services.leadconnectorhq.com", "");
    const body = init.body ? JSON.parse(init.body) : undefined;
    calls.push({ method: init.method, path, body, auth: init.headers.Authorization });
    if (failOn && path.startsWith(failOn)) return new Response("nope", { status: 401 });
    if (path === "/contacts/upsert") return Response.json({ contact: { id: "c1" } });
    if (path.startsWith("/opportunities/search")) {
      return Response.json({ opportunities: openOpportunities });
    }
    if (path.startsWith("/conversations/search")) return Response.json({ conversations });
    if (path === "/conversations/") return Response.json({ conversation: { id: "cv2" } });
    return Response.json({});
  };
  return { calls, fetch };
}

// Sin token no se llama a GHL.
delete process.env.GHL_PRIVATE_INTEGRATION;
{
  const ghl = fakeGhl();
  assert.equal(await sendLeadToGhl(lead, ghl.fetch), "skipped");
  assert.equal(ghl.calls.length, 0);
}

process.env.GHL_PRIVATE_INTEGRATION = "token-de-prueba";

// Lead nuevo: contacto, etiqueta, nota, oportunidad en "01 Nuevo Prospecto" y
// mensaje entrante para que salga sin leer en Conversations.
{
  const ghl = fakeGhl();
  assert.equal(await sendLeadToGhl(lead, ghl.fetch), "sent");
  assert.deepEqual(
    ghl.calls.map((c) => `${c.method} ${c.path.split("?")[0]}`),
    [
      "POST /contacts/upsert",
      "POST /contacts/c1/tags",
      "POST /contacts/c1/notes",
      "GET /opportunities/search",
      "POST /opportunities/",
      "GET /conversations/search",
      "POST /conversations/messages/inbound",
    ],
  );
  const [upsert, tags, note, search, opportunity, conversation, inbound] = ghl.calls;
  assert.match(conversation.path, /contactId=c1/);
  assert.equal(inbound.body.type, "Email");
  assert.equal(inbound.body.conversationId, "cv1");
  assert.equal(inbound.body.emailFrom, lead.email);
  assert.match(inbound.body.message, /Mensaje: Quiero información del FrescaFlow/);
  assert.match(inbound.body.html, /<br>/);
  assert.equal(upsert.auth, "Bearer token-de-prueba");
  assert.equal(upsert.body.phone, "+19295550100");
  assert.deepEqual(upsert.body.customFields, [
    { id: "RN2yhPQ9iHEbi5S2KHSw", field_value: "Website" },
    { id: "h7BVNHNiXzaMhU0RZwEK", field_value: lead.mensaje },
    { id: "6mml1ucgTmCKg8YC6SUB", field_value: "Royal Prestige FrescaFlow" },
  ]);
  assert.deepEqual(tags.body.tags, ["website-contacto", "sms-consentimiento-web"]);
  assert.match(note.body.body, /Motivo: informacion/);
  assert.match(search.path, /contact_id=c1/);
  assert.equal(opportunity.body.pipelineStageId, "fe78654c-f6e9-47a2-b1b5-cc907c7b350e");
  assert.equal(opportunity.body.status, "open");
}

// Ya tiene una oportunidad abierta: no se crea otra ni se mueve de etapa.
{
  const ghl = fakeGhl({ openOpportunities: [{ id: "o1" }] });
  await sendLeadToGhl({ ...lead, consentimientoSms: false }, ghl.fetch);
  assert.ok(!ghl.calls.some((c) => c.method === "POST" && c.path === "/opportunities/"));
  assert.deepEqual(ghl.calls[1].body.tags, ["website-contacto"]);
}

// Cliente existente: no entra al embudo de venta, pero sí llega a la bandeja.
{
  const ghl = fakeGhl();
  await sendLeadToGhl({ ...lead, motivo: "cliente" }, ghl.fetch);
  assert.ok(!ghl.calls.some((c) => c.path.startsWith("/opportunities")));
  assert.ok(ghl.calls.some((c) => c.path === "/conversations/messages/inbound"));
}

// Contacto sin conversación todavía: se crea antes de dejar el mensaje.
{
  const ghl = fakeGhl({ conversations: [] });
  await sendLeadToGhl(lead, ghl.fetch);
  const create = ghl.calls.find((c) => c.path === "/conversations/");
  assert.equal(create.body.contactId, "c1");
  assert.equal(ghl.calls.at(-1).body.conversationId, "cv2");
}

// Lo que escribe el visitante no entra como HTML en el CRM.
{
  const ghl = fakeGhl();
  await sendLeadToGhl({ ...lead, mensaje: "<script>alert(1)</script>" }, ghl.fetch);
  assert.ok(!ghl.calls.at(-1).body.html.includes("<script>"));
}

// El mensaje es un añadido: si falla, el lead ya está en el CRM y no se pierde.
{
  const ghl = fakeGhl({ failOn: "/conversations" });
  const errors = [];
  const original = console.error;
  console.error = (message) => errors.push(message);
  assert.equal(await sendLeadToGhl(lead, ghl.fetch), "sent");
  console.error = original;
  assert.match(errors[0], /Conversations/);
}

// Sorteo: sin email, con dirección; fuente "Sorteo / Rifa" y sin paso por la bandeja.
{
  const ghl = fakeGhl();
  const { nombre, apellido, telefono, consentimiento, consentimientoSms } = lead;
  await sendLeadToGhl(
    {
      nombre,
      apellido,
      telefono,
      consentimiento,
      consentimientoSms,
      direccion: "5030 Broadway Apt 2, New York, NY 10034",
      fuente: "sorteo-plancha-innove",
    },
    ghl.fetch,
  );
  const [upsert, tags, note] = ghl.calls;
  assert.equal(upsert.body.email, undefined);
  assert.equal(upsert.body.address1, "5030 Broadway Apt 2, New York, NY 10034");
  assert.equal(upsert.body.source, "Sorteo / Rifa");
  assert.deepEqual(upsert.body.customFields, [
    { id: "RN2yhPQ9iHEbi5S2KHSw", field_value: "Sorteo / Rifa" },
  ]);
  assert.deepEqual(tags.body.tags, ["website-sorteo-plancha-innove", "sms-consentimiento-web"]);
  assert.match(note.body.body, /Dirección: 5030 Broadway/);
  const opportunity = ghl.calls.find((c) => c.path === "/opportunities/");
  assert.equal(opportunity.body.source, "Sorteo / Rifa");
  assert.ok(!ghl.calls.some((c) => c.path.startsWith("/conversations")));
}

// Un error de GHL se propaga para que /api/leads lo registre.
{
  const ghl = fakeGhl({ failOn: "/contacts/upsert" });
  await assert.rejects(sendLeadToGhl(lead, ghl.fetch), /respondió 401/);
}

console.log(
  "ok   entrega a GHL (sin token, lead nuevo, oportunidad existente, cliente, conversación, HTML, mensaje fallido, sorteo, error)",
);
