import { z } from "zod";

export const leadSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(100),
  apellido: z.string().min(1, "El apellido es obligatorio").max(100),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(7, "Teléfono inválido").max(20),
  productoInteres: z.string().optional(),
  mensaje: z.string().optional(),
});

export type LeadSchemaType = z.infer<typeof leadSchema>;
