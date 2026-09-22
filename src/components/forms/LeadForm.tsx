"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactReasons, contactSchema, leadSchema, sorteoSchema } from "@/lib/lead-schema";
import type { LeadSchemaType } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";

interface LeadFormProps {
  fuente: string;
  // "contacto" pide motivo y mensaje; "demostracion" solo los datos básicos;
  // "sorteo" cambia email, producto y mensaje por la dirección.
  variant?: "demostracion" | "contacto" | "sorteo";
  defaultProduct?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}

const inputClass =
  "w-full rounded-none border border-[var(--color-steel)]/50 bg-[var(--color-pure-white)] px-4 py-3.5 text-base text-[var(--color-graphite)] transition-colors placeholder:text-[var(--color-steel)] focus:border-[var(--color-ink)] focus:ring-2 focus:ring-[var(--color-ink)]/20 focus:outline-none aria-[invalid=true]:border-red-600";

const labelClass =
  "mb-2 block text-[11px] font-medium tracking-[0.12em] text-[var(--color-steel)] uppercase";

export function LeadForm({
  fuente,
  variant = "demostracion",
  defaultProduct,
  submitLabel = "Solicitar demostración",
  successTitle = "Gracias. Hemos recibido su solicitud.",
  successBody = "Una especialista se comunicará con usted a la brevedad.",
}: LeadFormProps) {
  const isContact = variant === "contacto";
  const isSorteo = variant === "sorteo";
  const [isPending, startTransition] = useTransition();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  // Primer nombre de quien envió; successTitle puede usarlo como {nombre}.
  const [sentName, setSentName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadSchemaType>({
    // El sorteo no pide email: su esquema lo deja opcional, de ahí el cast.
    resolver: zodResolver(
      isContact ? contactSchema : isSorteo ? sorteoSchema : leadSchema,
    ) as Resolver<LeadSchemaType>,
    mode: "onBlur",
    defaultValues: { productoInteres: defaultProduct ?? "", consentimientoSms: false },
  });

  const onSubmit = (data: LeadSchemaType) => {
    setSubmitState("idle");
    startTransition(async () => {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, fuente }),
        });
        if (!response.ok) throw new Error(String(response.status));
        setSentName(data.nombre.split(" ")[0]);
        setSubmitState("success");
        reset();
      } catch {
        setSubmitState("error");
      }
    });
  };

  const id = (field: string) => `${fuente}-${field}`;
  const fieldError = (field: keyof LeadSchemaType) => {
    const message = errors[field]?.message;
    return message ? (
      <p id={id(`${field}-error`)} className="mt-1 text-sm text-red-600">
        {message}
      </p>
    ) : null;
  };
  const a11y = (field: keyof LeadSchemaType) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? id(`${field}-error`) : undefined,
  });

  if (submitState === "success") {
    return (
      // El foco lleva la vista a la confirmación: el formulario se encoge al enviarse.
      <div
        className="py-8 text-center outline-none"
        role="status"
        tabIndex={-1}
        ref={(el) => el?.focus()}
      >
        <h3 className="mb-3 font-display text-2xl">{successTitle.replace("{nombre}", sentName)}</h3>
        <p className="text-sm text-[var(--color-steel)]">{successBody}</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => {
            setSubmitState("idle");
            reset();
          }}
        >
          {isSorteo ? "Inscribir a otra persona" : "Enviar otra solicitud"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={id("nombre")}>
            {isSorteo ? "Nombres" : "Nombre"}
          </label>
          <input
            id={id("nombre")}
            type="text"
            autoComplete="given-name"
            {...register("nombre")}
            {...a11y("nombre")}
            className={inputClass}
          />
          {fieldError("nombre")}
        </div>
        <div>
          <label className={labelClass} htmlFor={id("apellido")}>
            {isSorteo ? "Apellidos" : "Apellido"}
          </label>
          <input
            id={id("apellido")}
            type="text"
            autoComplete="family-name"
            {...register("apellido")}
            {...a11y("apellido")}
            className={inputClass}
          />
          {fieldError("apellido")}
        </div>
      </div>
      {isSorteo && (
        <div>
          <label className={labelClass} htmlFor={id("direccion")}>
            Dirección
          </label>
          <input
            id={id("direccion")}
            type="text"
            autoComplete="street-address"
            placeholder="Calle, apto., ciudad y ZIP"
            {...register("direccion")}
            {...a11y("direccion")}
            className={inputClass}
          />
          {fieldError("direccion")}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {!isSorteo && (
          <div>
            <label className={labelClass} htmlFor={id("email")}>
              Email
            </label>
            <input
              id={id("email")}
              type="email"
              autoComplete="email"
              {...register("email")}
              {...a11y("email")}
              className={inputClass}
            />
            {fieldError("email")}
          </div>
        )}
        <div>
          <label className={labelClass} htmlFor={id("telefono")}>
            {isSorteo ? "Número de teléfono" : "Teléfono"}
          </label>
          <input
            id={id("telefono")}
            type="tel"
            autoComplete="tel"
            {...register("telefono")}
            {...a11y("telefono")}
            className={inputClass}
          />
          {fieldError("telefono")}
        </div>
      </div>
      {isContact && (
        <div>
          <label className={labelClass} htmlFor={id("motivo")}>
            ¿En qué podemos ayudarle?
          </label>
          <select
            id={id("motivo")}
            // El select vacío llega como "": undefined para que valga el aviso propio.
            {...register("motivo", { setValueAs: (value) => value || undefined })}
            {...a11y("motivo")}
            className={inputClass}
          >
            <option value="">Seleccione un motivo</option>
            {Object.entries(contactReasons).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {fieldError("motivo")}
        </div>
      )}
      {!isSorteo && (
        <>
          <div>
            <label className={labelClass} htmlFor={id("producto")}>
              Producto de interés{isContact ? " (opcional)" : ""}
            </label>
            <select id={id("producto")} {...register("productoInteres")} className={inputClass}>
              <option value="">Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.name}
                </option>
              ))}
              <option value="otros">Otro</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor={id("mensaje")}>
              {isContact ? "Mensaje" : "Mensaje (opcional)"}
            </label>
            <textarea
              id={id("mensaje")}
              rows={isContact ? 5 : 4}
              maxLength={2000}
              {...register("mensaje")}
              {...a11y("mensaje")}
              className={`${inputClass} resize-none`}
            />
            {fieldError("mensaje")}
          </div>
        </>
      )}
      <div className="space-y-4 border-t border-[var(--color-steel)]/30 pt-6">
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              {...register("consentimiento")}
              {...a11y("consentimiento")}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ink)]"
            />
            <span className="text-sm text-[var(--color-graphite)]">
              {isSorteo ? (
                <>
                  Acepto las{" "}
                  <a href="#bases" className="text-[var(--color-deep-royal-blue)] underline">
                    bases del sorteo
                  </a>{" "}
                  y que mi información sea utilizada para contactarme, según la{" "}
                </>
              ) : (
                <>
                  Acepto que mi información sea utilizada para contactarme y coordinar la atención
                  solicitada, según la{" "}
                </>
              )}
              <Link href="/privacidad" className="text-[var(--color-deep-royal-blue)] underline">
                política de privacidad
              </Link>
              .
            </span>
          </label>
          {fieldError("consentimiento")}
        </div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            {...register("consentimientoSms")}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ink)]"
          />
          <span className="text-sm text-[var(--color-graphite)]">
            Acepto recibir mensajes de texto de {siteConfig.name} sobre mi solicitud, confirmaciones
            y recordatorios de cita. La frecuencia puede variar y pueden aplicarse tarifas. Responda
            STOP para cancelar. (Opcional)
          </span>
        </label>
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isPending}
        className="w-full sm:w-auto"
      >
        {isPending ? "Enviando..." : submitLabel}
      </Button>
      {submitState === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Hubo un error al enviar su solicitud. Inténtelo de nuevo o llámenos al{" "}
          <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`} className="underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      )}
    </form>
  );
}
