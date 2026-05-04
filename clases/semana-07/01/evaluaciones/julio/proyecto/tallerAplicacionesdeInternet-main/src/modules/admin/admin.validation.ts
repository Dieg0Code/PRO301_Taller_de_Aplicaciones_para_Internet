import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "Debes ingresar un usuario."),
  password: z.string().min(1, "Debes ingresar una contrasena.")
});

export type AdminLoginDto = z.infer<typeof adminLoginSchema>;

// Valida el `id` recibido en rutas administrativas que operan sobre una reserva concreta.
export const adminBookingParamsSchema = z.object({
  id: z.uuid("Debes indicar un identificador de reserva valido.")
});

export type AdminBookingParamsDto = z.infer<typeof adminBookingParamsSchema>;
