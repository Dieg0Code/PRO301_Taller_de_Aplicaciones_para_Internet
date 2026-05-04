import { z } from "zod";
import { PET_TYPES, SERVICES } from "./bookings.constants.js";

// Valida la entrada publica del formulario antes de aplicar reglas de negocio.
export const createBookingSchema = z.object({
  ownerName: z.string().trim().min(3, "El nombre del tutor debe tener al menos 3 caracteres."),
  petName: z.string().trim().min(2, "El nombre de la mascota debe tener al menos 2 caracteres."),
  petType: z.enum(PET_TYPES, "Debes seleccionar un tipo de mascota valido."),
  service: z.enum(SERVICES, "Debes seleccionar un servicio valido."),
  appointmentDate: z.iso.date("Debes ingresar una fecha valida."),
  appointmentTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Debes ingresar una hora valida."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9()\-\s]{8,20}$/, "Debes ingresar un telefono valido."),
  notes: z
    .string()
    .trim()
    .max(500, "Las observaciones no pueden superar los 500 caracteres.")
    .refine((value) => !/[<>$`]/.test(value), "Las observaciones contienen caracteres no permitidos.")
    .optional()
    .or(z.literal(""))
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;

// Valida las consultas del selector de disponibilidad por fecha y servicio.
export const bookingAvailabilitySchema = z.object({
  date: z.iso.date("Debes indicar una fecha valida."),
  service: z.enum(SERVICES, "Debes indicar un servicio valido.")
});

export type BookingAvailabilityDto = z.infer<typeof bookingAvailabilitySchema>;
