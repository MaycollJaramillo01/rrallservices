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

function fakeGhl({ openOpportunities = [], failOn } = {}) {
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

// Lead nuevo: contacto, etiqueta, nota y oportunidad en "01 Nuevo Prospecto".
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
    ],
  );
  const [upsert, tags, note, search, opportunity] = ghl.calls;
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

// Cliente existente: no entra al embudo de venta.
{
  const ghl = fakeGhl();
  await sendLeadToGhl({ ...lead, motivo: "cliente" }, ghl.fetch);
  assert.ok(!ghl.calls.some((c) => c.path.startsWith("/opportunities")));
}

// Un error de GHL se propaga para que /api/leads lo registre.
{
  const ghl = fakeGhl({ failOn: "/contacts/upsert" });
  await assert.rejects(sendLeadToGhl(lead, ghl.fetch), /respondió 401/);
}

console.log("ok   entrega a GHL (sin token, lead nuevo, oportunidad existente, cliente, error)");
