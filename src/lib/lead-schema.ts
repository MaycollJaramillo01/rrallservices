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

export type LeadSchemaType = z.infer<typeof leadSchema>;
