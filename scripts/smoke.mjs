// Verificación mínima contra un servidor en marcha: rutas vivas, captación de
// leads y límite de envíos. Uso: npm run dev (u otra terminal) y `npm run smoke`.
// ponytail: sin framework de test; esto es lo único que debe seguir funcionando.
import assert from "node:assert/strict";

const base = process.env.SMOKE_URL || "http://localhost:3000";

const routes = [
  "/",
  "/productos",
  "/productos?cat=agua",
  "/productos/frescaflow",
  "/categorias/cocina",
  "/demostraciones",
  "/demostraciones?producto=frescapure",
  "/nosotros",
  "/contacto",
  "/preguntas-frecuentes",
  "/privacidad",
  "/terminos",
  "/sitemap.xml",
  "/robots.txt",
];

const lead = {
  nombre: "Smoke",
  apellido: "Test",
  email: "smoke@example.com",
  telefono: "9296704101",
  productoInteres: "frescaflow",
  consentimiento: true,
  fuente: "smoke-test",
};

const post = (body) =>
  fetch(`${base}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, `${route} devolvió ${response.status}`);
  console.log(`ok   ${route}`);
}

const first = await post(lead);
if (first.status === 429) {
  console.error(
    "\nEl límite de envíos sigue activo de una corrida anterior. Espere un minuto y repita.",
  );
  process.exit(1);
}
assert.equal(first.status, 200, "un lead válido debe aceptarse");
console.log("ok   POST /api/leads (lead válido)");

assert.equal(
  (await post({ nombre: "", email: "no-es-email" })).status,
  400,
  "un lead inválido debe rechazarse",
);
console.log("ok   POST /api/leads (validación)");

// El límite es de 5 por minuto e IP; ya se consumieron 2 envíos arriba.
const rest = await Promise.all([post(lead), post(lead), post(lead), post(lead)]);
assert.ok(
  rest.some((response) => response.status === 429),
  "el límite de envíos debe cortar la ráfaga",
);
console.log("ok   POST /api/leads (límite de envíos)");

console.log("\nTodo en orden.");
