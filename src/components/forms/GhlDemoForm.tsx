"use client";

import Script from "next/script";
import { useEffect, useId, useState } from "react";

// Formulario oficial de GoHighLevel ("Solicitud de demostracion - Website").
// Envía directo a la subcuenta y dispara el workflow de captación: no pasa por
// /api/leads ni necesita claves, el embed es público.
// ponytail: sin preselección de producto. Rellenar `producto_de_interes` por URL
// hace que GHL muestre "Submission in progress" en visitas repetidas; el
// `?producto=` de la página igual llega a GHL en la URL de atribución.
const FORM_ID = "zBjBnoQCCPzc32mv3xMw";
const FORM_NAME = "Solicitud de demostracion - Website";
const EMBED_SRC = "https://link.msgsndr.com/js/form_embed.js";
const EMBED_ORIGIN = "https://api.leadconnectorhq.com";
const SIZER_PREFIX = "[iFrameSizer]";

// Alto que publica GHL en el embed. Se conserva en `data-height` porque forma
// parte del snippet, pero como alto real sobra ~200px en tableta y escritorio.
const PUBLISHED_HEIGHT = 1324;

// Alto reservado antes de recibir la medida real, tomado del formulario ya
// renderizado en cada ancho (móvil ~1341, tableta ~1040, escritorio ~1120).
// Evita el salto de layout; lo sustituye la medida del iframe en cuanto llega.
const RESERVED_HEIGHT = "h-[1340px] sm:h-[1040px] lg:h-[1120px]";

// form_embed.js saca el iframe del flujo (position: absolute) para ocultarlo
// mientras carga y solo lo restaura al terminar su resizer. Ese resizer no
// vuelve a correr en una visita sin recarga, así que el formulario quedaba
// fuera de flujo y recortado por abajo. `relative!` gana al estilo en línea.
const IN_FLOW = "relative!";

export function GhlDemoForm() {
  // El mismo motivo de arriba deja el alto congelado tras navegar sin recarga.
  // Por eso se toma del propio iframe (protocolo iFrameSizer), que sí emite su
  // medida en cada visita, en lugar de depender del resizer de GHL.
  const iframeId = `inline-${FORM_ID}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    // "[iFrameSizer]<id>:<alto>:<ancho>:<tipo>"
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== EMBED_ORIGIN) return;
      if (typeof event.data !== "string" || !event.data.startsWith(SIZER_PREFIX)) return;

      const [id, rawHeight] = event.data.slice(SIZER_PREFIX.length).split(":");
      // Si el iframe ya existía en la visita anterior, form_embed.js renombra el
      // id a `<id>___1` para no repetirlo; ese sufijo sigue siendo nuestro.
      if (id !== iframeId && !id.startsWith(`${iframeId}___`)) return;

      // El iframe emite un `0:0` espurio al inicializar; ignorarlo evita
      // colapsar el formulario.
      const next = Number(rawHeight);
      if (!Number.isFinite(next) || next <= 0) return;

      setHeight(next);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [iframeId]);

  return (
    <>
      <iframe
        className={height ? IN_FLOW : `${IN_FLOW} ${RESERVED_HEIGHT}`}
        src={`${EMBED_ORIGIN}/widget/form/${FORM_ID}`}
        style={{ width: "100%", height, border: "none", borderRadius: 8 }}
        id={iframeId}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={FORM_NAME}
        data-height={PUBLISHED_HEIGHT}
        data-layout-iframe-id={iframeId}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title={FORM_NAME}
      />
      {/* next/script lo inserta una sola vez aunque se vuelva a la página.
          Aporta el consentimiento de cookies y la atribución por query params;
          el alto ya no depende de él. */}
      <Script id="ghl-form-embed" src={EMBED_SRC} strategy="lazyOnload" />
    </>
  );
}
