import type { Request, Response } from "express";

import { BookingsRepository } from "../bookings/bookings.repository.js";
import {
  buildLogoutCookie,
  buildSessionCookie,
  createAdminSessionToken,
  isValidAdminCredentials
} from "./admin.auth.js";
import { getAdminSessionFromRequest } from "./admin.middleware.js";
import { AdminService } from "./admin.service.js";
import { adminBookingParamsSchema, adminLoginSchema } from "./admin.validation.js";

// Reutilizamos el repositorio de reservas para que el panel admin comparta la misma fuente de datos.
const adminService = new AdminService(new BookingsRepository());

export class AdminController {
  // Inicia sesion, firma la cookie y devuelve el estado de autenticacion al frontend admin.
  login = async (request: Request, response: Response): Promise<void> => {
    const parsedBody = adminLoginSchema.safeParse(request.body);

    if (!parsedBody.success) {
      response.status(400).json({
        message: "Credenciales invalidas.",
        errors: parsedBody.error.flatten().fieldErrors
      });
      return;
    }

    const { username, password } = parsedBody.data;

    if (!isValidAdminCredentials(username, password)) {
      response.status(401).json({
        message: "Usuario o contrasena incorrectos."
      });
      return;
    }

    const token = createAdminSessionToken(username);

    response.setHeader("Set-Cookie", buildSessionCookie(token));
    response.json({
      message: "Sesion iniciada correctamente.",
      data: {
        username,
        authenticated: true
      }
    });
  };

  // Cierra la sesion limpiando la cookie actual del administrador.
  logout = async (_request: Request, response: Response): Promise<void> => {
    response.setHeader("Set-Cookie", buildLogoutCookie());
    response.json({
      message: "Sesion cerrada correctamente."
    });
  };

  // Permite restaurar sesion al recargar la pagina del panel.
  getSession = async (request: Request, response: Response): Promise<void> => {
    const session = getAdminSessionFromRequest(request);

    if (!session) {
      response.status(401).json({
        message: "No hay una sesion activa.",
        data: {
          authenticated: false
        }
      });
      return;
    }

    response.json({
      message: "Sesion activa.",
      data: {
        username: session.username,
        authenticated: true
      }
    });
  };

  // Entrega al dashboard las reservas activas para uso operativo.
  listBookings = async (_request: Request, response: Response): Promise<void> => {
    try {
      const bookings = await adminService.listScheduledBookings();

      response.json({
        message: "Reservas obtenidas correctamente.",
        data: bookings
      });
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : "No fue posible obtener las reservas."
      });
    }
  };

  // Elimina una reserva especifica desde el panel admin usando su id.
  deleteBooking = async (request: Request, response: Response): Promise<void> => {
    const parsedParams = adminBookingParamsSchema.safeParse(request.params);

    if (!parsedParams.success) {
      response.status(400).json({
        message: "Debes indicar una reserva valida para eliminar.",
        errors: parsedParams.error.flatten().fieldErrors
      });
      return;
    }

    try {
      await adminService.deleteBooking(parsedParams.data.id);

      response.json({
        message: "Reserva eliminada correctamente."
      });
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : "No fue posible eliminar la reserva."
      });
    }
  };
}
