# Trabaja con nosotros — revisión de implementación

Preparada el 13 de octubre de 2026 para revisión. El 14 de octubre de 2026 se autorizó
subir la implementación a `main`. La confirmación de publicación en hosting es independiente
de la subida del código.

## Código y alcance

La carpeta inicial `C:/Users/Mayco/Desktop/ROYALPRESTIGE` contiene una versión anterior.
La documentación existente de GHL identifica el código vigente en
`C:/Users/Mayco/Documents/RoyalPrestige`, repositorio `MaycollJaramillo01/rrallservices`.
Se comprobó que esta copia coincide con los componentes del sitio publicado.
Los cambios están en esa copia; no se sustituyó ni alteró la versión anterior.

Sección «Trabaja con nosotros» en `/trabaja-con-nosotros`, acceso desde navegación principal y móvil, pie de página,
bloque en inicio y sitemap. Usa los componentes, colores e imágenes de marca existentes.
Se ajustó el punto de entrada del menú móvil para que el nuevo enlace quepa en el encabezado.
La ruta anterior `/oportunidad-royal` redirige con 308 a la sección nueva y conserva los
parámetros UTM. Oportunidad Royal continúa como nombre del modelo explicado y del interés
registrado en GHL; la fuente y las etiquetas específicas siguen iguales. La página real de
la consulta se registra ahora como `/trabaja-con-nosotros`.

El formulario pide nombre, apellido, teléfono, correo y mensaje opcional. La privacidad es
obligatoria; SMS es opcional, separado y desmarcado. La confirmación informa que la solicitud
no implica incorporación ni reserva una demostración. La política existente incluye ahora
esta finalidad y los datos de atribución.

## Información confirmada y fuentes

- Identidad, Kellyn Reyes y área New York: sitio público de RR All Services, revisado en
  navegador el 13 de octubre de 2026, y `src/data/company.ts`.
- Modelo de negocio propio y distribución independiente:
  [Royal Prestige, negocio en Estados Unidos](https://www.royalprestige.com/en-us/business).
- Venta a través de distribuidores y presentación de productos:
  [Royal Prestige, versión en español](https://www.royalprestige.com/negocio).
- Proceso de presentación: componentes y páginas actuales de RR All Services.

No se trasladaron al contenido local las afirmaciones generales sobre inversión, ingresos,
financiamiento, viajes o capacitación que aparecen en materiales de la marca. Deben confirmarse
las condiciones aplicables al equipo antes de publicar afirmaciones concretas.

No hay un retrato verificado de Kellyn ni fotografías identificadas del equipo en el material
disponible. Se usó la pieza de marca existente, con su descripción y pie de imagen, sin
presentarla como una fotografía del equipo. No se asignaron cargos nuevos ni se reutilizaron
las cifras de trayectoria del sitio como resultados de la oportunidad.

## Datos comerciales por confirmar antes de publicar

1. Acuerdos, relación comercial y condiciones particulares de participación con RR All Services.
2. Requisitos de experiencia y cualquier condición de ubicación o disponibilidad.
3. Costos, compromisos o condiciones iniciales y detalle por escrito para el interesado.
4. Capacitación, mentoría, materiales y acompañamiento realmente ofrecidos por el equipo.
5. Biografía y funciones aprobadas de Kellyn, nombres del equipo y fotografías autorizadas.
6. Responsable del primer contacto, canal, plazo de respuesta y proceso de seguimiento.

Las FAQ no inventan estas respuestas: remiten a la conversación para confirmar condiciones.
Su redacción final también requiere revisión de RR All Services.

## Captura en GHL y seguimiento pendiente

`src/lib/ghl.ts` conserva la integración existente. Para `fuente: oportunidad-royal`:

- `contact.source`: `website-oportunidad-royal`.
- Etiquetas añadidas: `website-oportunidad-royal`, `interes-oportunidad-royal`.
- SMS aceptado: `sms-consentimiento-oportunidad-royal`, sin la etiqueta de las demostraciones.
- Nota: interés de negocio explícito, mensaje, privacidad, elección de SMS, origen UTM, página,
  referencia y fecha del servidor. Los UTM no pueden cambiar el tipo de consulta ni su fuente fija.
- No escribe el campo de producto. Añadir etiquetas conserva las que ya tuviera el contacto.
- El campo desplegable existente «Fuente del prospecto» mantiene su opción válida `Website`;
  el origen específico queda en `contact.source`, las etiquetas y la nota.
- Guarda la consulta como email **entrante** en Conversations para revisión manual, sin enviar
  un email al visitante. Un fallo de este registro secundario se registra en el servidor.
- No consulta ni crea oportunidades de venta; tampoco reserva citas, inscribe en workflows,
  envía SMS ni manda notificaciones por Resend.
- Un fallo en contacto, etiquetas o nota devuelve error; sin token GHL devuelve 503.

El listado de workflows leído por API el 13 de octubre contenía cuatro procesos: captación de
demostraciones, dos de Instagram/sorteo y etiquetado de participantes del sorteo. No apareció
un workflow de reclutamiento. No se modificaron esos procesos.

Seguimiento provisional: revisar `website-oportunidad-royal` en Contactos y la consulta entrante
en Conversations. RR All Services debe asignar un responsable y confirmar canal y plazo de
respuesta. No hay tarea, asignación ni cadencia automática configurada para reclutamiento.

## Validación

- Build de producción: correcto; la ruta se genera estáticamente.
- TypeScript: correcto.
- ESLint en código y comprobación general excluyendo `.claude/**` y `tmp/**`: sin errores;
  tres avisos existentes de configuración y fuentes. `npm run lint` sin exclusiones alcanza
  artefactos compilados de otros worktrees bajo `.claude` y falla por ese motivo preexistente.
- `npm run check:ghl`: pruebas existentes y nuevas correctas. Verifica privacidad, SMS
  separado, teléfono/correo/nombres, UTM incluso con campaña de sorteo, errores de GHL y
  ausencia de llamadas a oportunidades/calendarios.
- Navegador: enlace principal al formulario, menú móvil y cierre al navegar, formulario vacío,
  rechazo de teléfono con letras, envío válido con mensaje vacío y SMS desmarcado, confirmación
  específica, lectura y ausencia de desbordamiento a 1440, 390 y 320 px.
- El envío desde navegador se hizo contra un receptor GHL simulado local, sin correo saliente.
- API: se rechazaron privacidad ausente, correo/teléfono inválidos y cambios del motivo a
  demostración o producto. Sin GHL configurado, una consulta válida devolvió 503 y el navegador
  mostró el error sin borrar los datos. [Resultados de API y enlaces](api-check.json).
- `npm run smoke`: rutas (incluida Oportunidad Royal), validación y límite de envíos correctos
  contra el receptor simulado. El servidor simulado se detuvo después de las pruebas.
- Prueba real controlada con datos ficticios y DND activo: fuente y etiquetas correctas,
  interés/privacidad/UTM registrados, cero citas y cero oportunidades. Evidencia:
  [resultado GHL](ghl-controlled-test.json).
- Contacto de prueba conservado: `kA3vgmjbR83u7xASOcRl`,
  `qa-oportunidad-royal-20261013@example.com`, etiqueta `prueba-oportunidad-royal`.
  No contactar; no forma parte de los interesados reales.

## Capturas

- [Escritorio](escritorio.jpg) y [página completa](escritorio-completo.jpg).
- [Móvil](movil.jpg), [menú móvil](menu-movil.jpg) y [formulario móvil](formulario-movil.jpg).
- [Formulario escritorio](formulario-escritorio.jpg) y [confirmación](confirmacion-escritorio.jpg).
- [Bloque de inicio](inicio-escritorio.jpg), [equipo](equipo-escritorio.jpg) y
  [error de recepción en móvil](error-recepcion-movil.jpg).

Vista local de revisión: `http://localhost:3011/trabaja-con-nosotros`. Se sirve sin credenciales
GHL ni Resend, por lo que los formularios de Oportunidad Royal muestran un error de recepción
si se intenta enviarlos en esa vista. El sitio en producción mantiene su configuración existente.

Para repetir: `npm run build`, `npm run typecheck`, `npm run check:ghl`,
`npx eslint src scripts/ghl-check.mjs` y `npm run smoke` contra un servidor local con
recepción simulada. No ejecutar smoke contra producción ni con credenciales reales: crea
contactos y solicitudes de prueba. La clave GHL se mantiene únicamente en el entorno del servidor.
