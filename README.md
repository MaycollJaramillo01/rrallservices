# RR All Services

Sitio de RR All Services, Distribuidor Autorizado Independiente de Royal Prestige® en New York.
Es un catálogo informativo: no vende en línea, su conversión es la **solicitud de demostración**.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y complete los valores
npm run dev
```

## Scripts

| Comando            | Qué hace                                                       |
| ------------------ | -------------------------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo en http://localhost:3000                 |
| `npm run build`    | Build de producción (salida `standalone`)                       |
| `npm start`        | Sirve el build de producción                                    |
| `npm run typecheck`| TypeScript sin emitir                                           |
| `npm run lint`     | ESLint                                                          |
| `npm run format`   | Prettier                                                        |
| `npm run smoke`    | Verifica rutas y captación de leads contra el servidor en marcha|
| `npm run check:ghl`| Verifica la entrega a GHL con un `fetch` simulado (no toca la cuenta)|

## Variables de entorno

Los datos de contacto se muestran en el sitio y salen de aquí, así que basta con cambiarlos en el
entorno para actualizarlos en todas las páginas.

| Variable               | Para qué sirve                                                |
| ---------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (metadatos, sitemap, robots)                     |
| `NEXT_PUBLIC_PHONE`    | Teléfono publicado y enlaces `tel:`                           |
| `NEXT_PUBLIC_EMAIL`    | Email publicado y enlaces `mailto:`                           |
| `NEXT_PUBLIC_ADDRESS`  | Dirección publicada                                            |
| `GHL_PRIVATE_INTEGRATION` | Token privado de GHL (solo servidor). Crea contacto, nota y oportunidad de `/contacto` y la home. |
| `RESEND_API_KEY`       | Envío del lead por correo. **Sin esta ni la de GHL, el lead solo se registra en los logs del servidor.** |
| `LEAD_FROM_EMAIL`      | Remitente del aviso de lead (dominio verificado en Resend)     |
| `LEAD_TO_EMAIL`        | Destinatario del aviso (por defecto, `NEXT_PUBLIC_EMAIL`)      |

## Cómo llegan los formularios

**`/demostraciones`** incrusta el formulario oficial de GoHighLevel (`GhlDemoForm`) y el **hero de
la home**, el calendario de citas «Demostración privada» (`GhlBookingCalendar`, ID
`xV8bryuKgy4triFXu9S2`). Ambos viven en `src/components/forms/GhlEmbed.tsx`: los datos van directo
a la subcuenta de GHL, sin claves ni variables de entorno. Campos, textos, duración y horario del
calendario se editan en GHL, no en el código. Si se edita el calendario por API, `PUT` con campos
sueltos resetea duración, intervalo y horario: hay que mandar la configuración completa.

`GhlEmbed` toma el alto de los mensajes del propio iframe y lo mantiene visible y en flujo aunque
`form_embed.js` intente ocultarlo: ese script está pensado para páginas estáticas y, al volver a la
página sin recargar (o a veces en carga directa), dejaba el formulario recortado o el calendario en
blanco.

Al ser embeds de GHL, los datos los recibe y almacena GoHighLevel como proveedor, y su script guarda
una clave `embedded_iframe_…` en el `localStorage` del visitante. Conviene que la política de
privacidad lo refleje (hoy el punto 7 afirma que el sitio no usa seguimiento de terceros).

El formulario de **`/contacto`** (variante `contacto`: motivo y mensaje obligatorios) y el de la
sección final de la **home** usan `LeadForm` y envían a `POST /api/leads`, que valida con Zod
(incluido el consentimiento de privacidad), limita a 5 envíos por minuto e IP y entrega el lead por
dos canales a la vez:

- **GoHighLevel** (`src/lib/ghl.ts`): crea o actualiza el contacto, añade la etiqueta
  `website-contacto` o `website-home-demo` (y `sms-consentimiento-web` si acepta SMS), guarda el
  mensaje en una nota y abre una oportunidad en «01 Nuevo Prospecto» si no tiene una abierta. Los
  clientes existentes (motivo «Ya soy cliente») no entran al embudo.
- **Correo** vía Resend a `LEAD_TO_EMAIL`.

Basta con que un canal reciba el lead para responder OK; si todos los configurados fallan, el
visitante ve el error con el teléfono.

El límite de envíos vive en memoria del proceso: con varias instancias, cada una lleva su propia
cuenta. Suficiente para el volumen actual; si algún día hace falta, se cambia por un contador
compartido en `src/lib/rate-limit.ts`.

## Estructura

```
src/app/          Rutas (App Router) + api/leads
src/components/   layout · home · product · catalog · forms · ui
src/config/       site, navigation, seo, commerce
src/data/         products, categories, company, verification
src/lib/          validación de leads y límite de envíos
public/assets/    Imágenes del sitio
```

## Pendientes del cliente

Datos heredados del sitio anterior que conviene confirmar antes de publicar (ver `info.txt`):

- **Email** `rrallservicves@gmail.com` — confirmado como correo de la dueña (no es errata).
- **Dirección** `5030 Broadwey…` — posible errata de `Broadway`.
- **WhatsApp** — el enlace anterior estaba pausado, así que el sitio no lo publica. Con un número
  activo se añade al header y al footer.
- **Cifras de trayectoria** (+10,000 / +2,040 / +2,855) — declaradas por el negocio, sin respaldo
  externo enlazado.
- **Textos legales** — redactados según cómo funciona hoy el sitio; conviene una revisión legal.

## Sobre el catálogo y las imágenes

El catálogo (`src/data/products.ts`) se construyó a partir del material gráfico entregado, no de un
listado oficial: los seis productos son los que aparecen en las piezas del distribuidor y sus textos
salen de esas mismas piezas. Conviene contrastarlo con el catálogo Royal Prestige® vigente.

Solo dos imágenes son fotografía de producto limpia (FrescaFlow y FrescaPure). El resto son piezas
de redes sociales con texto y logo incrustados, y por eso los productos se ven distintos entre sí en
la grilla. Con fotografía de producto sobre fondo neutro, el catálogo gana de inmediato.

El hero de escritorio incrusta el vídeo oficial de Royal Prestige®
(`youtu.be/m7tI3WypyVQ`) con el reproductor de YouTube, no con una copia alojada: re-alojarlo
incumpliría los términos de YouTube y los derechos de la marca. En móvil y tableta se sirve la foto
del producto y el iframe ni siquiera se solicita (`HeroVideo` lo monta solo a partir de 1024px).
Para cambiar el vídeo basta con editar `HERO_VIDEO_ID` en `HeroEditorial.tsx`.

No hay ninguna foto de Kellyn Reyes en el material entregado: la sección de historia usa una pieza
de marca. Al recibir un retrato, se sustituye en `src/data/company.ts`.
