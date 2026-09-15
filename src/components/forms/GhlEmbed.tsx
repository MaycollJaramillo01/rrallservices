"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState, type IframeHTMLAttributes } from "react";

// Embeds públicos de GoHighLevel (formulario y calendario). Envían directo a la
// subcuenta: no pasan por /api/leads ni necesitan claves.
const EMBED_SRC = "https://link.msgsndr.com/js/form_embed.js";
const EMBED_ORIGIN = "https://api.leadconnectorhq.com";
const SIZER_PREFIX = "[iFrameSizer]";
const SET_HEIGHT = "highlevel.setHeight";

// Los widgets informan su alto de dos formas:
// - resizer: "[iFrameSizer]<id>:<alto>:<ancho>:<tipo>" (formularios; el de
//   reservas solo en carga directa, porque al volver sin recargar no pide que
//   form_embed.js lo reinicie);
// - calendario: ["highlevel.setHeight", { height }], que el widget de reservas
//   repite en cada visita y al cambiar de paso.
function readHeight(data: unknown): { height: number; fromWidget: boolean } | undefined {
  if (typeof data === "string" && data.startsWith(SIZER_PREFIX)) {
    return { height: Number(data.slice(SIZER_PREFIX.length).split(":")[1]), fromWidget: false };
  }
  let message = data;
  if (typeof data === "string" && data.includes(SET_HEIGHT)) {
    try {
      message = JSON.parse(data);
    } catch {
      return undefined;
    }
  }
  if (Array.isArray(message) && message[0] === SET_HEIGHT) {
    return { height: Number(message[1]?.height), fromWidget: true };
  }
  return undefined;
}

// form_embed.js oculta el iframe mientras carga (position: absolute, left
// -9999px, visibility hidden, pointer-events none) y solo lo restaura cuando su
// propio resizer termina. En una visita sin recarga ese resizer no vuelve a
// correr, y en carga directa a veces tampoco revela el calendario: quedaba una
// tarjeta en blanco y sin clics. Las clases con `!` ganan a esos estilos en
// línea y lo dejan siempre visible y en flujo; mientras carga se ve el fondo
// blanco del propio widget.
const SHOWN = "relative! left-auto! visible! opacity-100! pointer-events-auto!";

interface GhlEmbedProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  // Ruta del widget, p. ej. "widget/form/<id>" o "widget/booking/<id>".
  widget: string;
  title: string;
  // Inicio del id del iframe, con el formato del snippet oficial de cada widget.
  idPrefix: string;
  // Clases de alto reservado hasta recibir la medida real (evita saltos).
  reservedHeight: string;
}

function GhlEmbed({ widget, title, idPrefix, reservedHeight, ...attributes }: GhlEmbedProps) {
  // El alto se toma de los mensajes del propio iframe en lugar de depender del
  // resizer de GHL, que se queda congelado tras navegar sin recarga. El id por
  // montaje (useId) es estable entre servidor y cliente y acotado en
  // localStorage; form_embed.js lo usa, pero los mensajes se asocian por
  // `event.source`, que sigue valiendo si renombra el id a `<id>___1`.
  const iframeId = `${idPrefix}${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    // Si el widget manda su propio alto, manda sobre el del resizer: así el
    // calendario mide lo mismo en carga directa que al volver sin recargar.
    let widgetReportsHeight = false;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== EMBED_ORIGIN || event.source !== iframeRef.current?.contentWindow) {
        return;
      }
      const reading = readHeight(event.data);
      // El resizer emite un `0:0` espurio al inicializar; ignorarlo evita colapsarlo.
      if (!reading || !Number.isFinite(reading.height) || reading.height <= 0) return;
      if (reading.fromWidget) widgetReportsHeight = true;
      else if (widgetReportsHeight) return;

      setHeight(reading.height);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        {...attributes}
        className={height ? SHOWN : `${SHOWN} ${reservedHeight}`}
        src={`${EMBED_ORIGIN}/${widget}`}
        style={{ width: "100%", height, border: "none", borderRadius: 8 }}
        id={iframeId}
        data-layout-iframe-id={iframeId}
        title={title}
      />
      {/* next/script lo inserta una sola vez aunque haya varios embeds o se
          vuelva a la página. Aporta el consentimiento de cookies y la
          atribución por query params; el alto ya no depende de él. */}
      <Script id="ghl-form-embed" src={EMBED_SRC} strategy="lazyOnload" />
    </>
  );
}

// ponytail: sin preselección de producto. Rellenar `producto_de_interes` por URL
// hace que GHL muestre "Submission in progress" en visitas repetidas; el
// `?producto=` de la página igual llega a GHL en la URL de atribución.
const FORM_ID = "zBjBnoQCCPzc32mv3xMw";
const FORM_NAME = "Solicitud de demostracion - Website";

// Formulario "Solicitud de demostracion - Website"; dispara el workflow de captación.
export function GhlDemoForm() {
  return (
    <GhlEmbed
      widget={`widget/form/${FORM_ID}`}
      title={FORM_NAME}
      idPrefix={`inline-${FORM_ID}-`}
      // Alto medido del formulario ya renderizado (móvil ~1341, tableta ~1040,
      // escritorio ~1120), no los 1324px publicados, que sobraban ~200px.
      reservedHeight="h-[1340px] sm:h-[1040px] lg:h-[1120px]"
      data-layout='{"id":"INLINE"}'
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name={FORM_NAME}
      data-height="1324"
      data-form-id={FORM_ID}
      data-cookie-consent="true"
      data-cookie-consent-provider="auto"
    />
  );
}

// Calendario "Demostracion privada - Website" (tipo evento, confirmación manual,
// avisos a la dueña). Horario y duración se cambian en GHL, no aquí.
const CALENDAR_ID = "xV8bryuKgy4triFXu9S2";

export function GhlBookingCalendar({ reservedHeight }: { reservedHeight: string }) {
  return (
    <GhlEmbed
      widget={`widget/booking/${CALENDAR_ID}`}
      title="Agendar demostración privada"
      idPrefix={`${CALENDAR_ID}_`}
      reservedHeight={reservedHeight}
      scrolling="no"
    />
  );
}
