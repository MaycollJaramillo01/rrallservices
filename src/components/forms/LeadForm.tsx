"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "@/lib/lead-schema";
import type { LeadSchemaType } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";

interface LeadFormProps {
  fuente: string;
  defaultProduct?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}

const inputClass =
  "w-full rounded-none border border-[var(--color-steel)]/50 bg-[var(--color-pure-white)] px-4 py-3.5 text-base text-[var(--color-graphite)] transition-colors placeholder:text-[var(--color-steel)] focus:border-[var(--color-ink)] focus:ring-2 focus:ring-[var(--color-ink)]/20 focus:outline-none";

const labelClass =
  "mb-2 block text-[11px] font-medium tracking-[0.12em] text-[var(--color-steel)] uppercase";

export function LeadForm({
  fuente,
  defaultProduct,
  submitLabel = "Solicitar demostración",
  successTitle = "Gracias. Hemos recibido su solicitud.",
  successBody = "Una especialista se comunicará con usted a la brevedad.",
}: LeadFormProps) {
  const [isPending, startTransition] = useTransition();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadSchemaType>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    defaultValues: { productoInteres: defaultProduct ?? "" },
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
        setSubmitState("success");
        reset();
      } catch {
        setSubmitState("error");
      }
    });
  };

  if (submitState === "success") {
    return (
      <div className="py-8 text-center">
        <h3 className="mb-3 font-display text-2xl">{successTitle}</h3>
        <p className="text-sm text-[var(--color-steel)]">{successBody}</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => {
            setSubmitState("idle");
            reset();
          }}
        >
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${fuente}-nombre`}>
            Nombre
          </label>
          <input
            id={`${fuente}-nombre`}
            type="text"
            autoComplete="given-name"
            {...register("nombre")}
            className={inputClass}
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${fuente}-apellido`}>
            Apellido
          </label>
          <input
            id={`${fuente}-apellido`}
            type="text"
            autoComplete="family-name"
            {...register("apellido")}
            className={inputClass}
          />
          {errors.apellido && (
            <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${fuente}-email`}>
            Email
          </label>
          <input
            id={`${fuente}-email`}
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClass}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${fuente}-telefono`}>
            Teléfono
          </label>
          <input
            id={`${fuente}-telefono`}
            type="tel"
            autoComplete="tel"
            {...register("telefono")}
            className={inputClass}
          />
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor={`${fuente}-producto`}>
          Producto de interés
        </label>
        <select id={`${fuente}-producto`} {...register("productoInteres")} className={inputClass}>
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
        <label className={labelClass} htmlFor={`${fuente}-mensaje`}>
          Mensaje (opcional)
        </label>
        <textarea
          id={`${fuente}-mensaje`}
          rows={4}
          {...register("mensaje")}
          className={`${inputClass} resize-none`}
        />
      </div>
      <label className="flex cursor-pointer items-start gap-3 border-t border-[var(--color-steel)]/30 pt-6">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--color-ink)]" />
        <span className="text-sm text-[var(--color-graphite)]">
          Acepto que mi información sea utilizada para contactarme y coordinar la atención
          solicitada.
        </span>
      </label>
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
