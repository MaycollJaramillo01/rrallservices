import { z } from "zod";

// Motivos del formulario de contacto. La clave viaja a GHL en la nota del contacto.
export const contactReasons = {
  informacion: "Información sobre un producto",
  demostracion: "Agendar una demostración",
  cliente: "Ya soy cliente (servicio o garantía)",
  otro: "Otro",
} as const;

const motivo = z.enum(["informacion", "demostracion", "cliente", "otro"], "Seleccione un motivo");

export const leadSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  apellido: z.string().trim().min(1, "El apellido es obligatorio").max(100),
  email: z.string().trim().email("Email inválido"),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(20),
  direccion: z.string().trim().max(200).optional(),
  productoInteres: z.string().max(60).optional(),
  motivo: motivo.optional(),
  mensaje: z.string().max(2000).optional(),
  consentimiento: z.literal(true, "Debe aceptar la política de privacidad para continuar"),
  consentimientoSms: z.boolean().optional(),
});

// Contacto: motivo y mensaje obligatorios.
const askMessage = "Cuéntenos en unas palabras en qué podemos ayudarle";
export const contactSchema = leadSchema.extend({
  motivo,
  mensaje: z.string(askMessage).trim().min(10, askMessage).max(2000),
});

// Sorteo (/sorteo): la dirección es obligatoria para confirmar la zona y
// entregar el premio. /api/leads usa este esquema solo con esta fuente.
export const SORTEO_FUENTE = "sorteo-plancha-innove";
export const sorteoSchema = leadSchema.extend({
  direccion: z.string().trim().min(8, "Escriba su dirección completa").max(200),
});

export type LeadSchemaType = z.infer<typeof leadSchema>;
export type SorteoSchemaType = z.infer<typeof sorteoSchema>;

export const OPORTUNIDAD_FUENTE = "oportunidad-royal";
export const OPORTUNIDAD_ORIGEN = "website-oportunidad-royal";

// Una consulta de negocio no puede convertirse en una demostración por sus datos.
export const opportunitySchema = leadSchema.extend({
  motivo: z.literal("oportunidad").default("oportunidad"),
  productoInteres: z.literal("").optional(),
  direccion: z.literal("").optional(),
  telefono: z
    .string()
    .trim()
    .max(30)
    .refine(
      (value) => /^[+\d\s().-]+$/.test(value) && /^\d{7,15}$/.test(value.replace(/\D/g, "")),
      "Escriba un teléfono válido, con código de país si corresponde",
    ),
  attribution: z
    .object({
      page: z.enum(["/trabaja-con-nosotros", "/oportunidad-royal"]),
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(120).optional(),
      referrer: z.string().max(500).optional(),
      landingPage: z.string().max(500).optional(),
      timestamp: z.iso.datetime().optional(),
    })
    .optional(),
});

export type OpportunitySchemaType = z.infer<typeof opportunitySchema>;
