import type { Request, Response } from "express";

import { BookingConflictError, BookingValidationError } from "./bookings.errors.js";
import { BookingsService } from "./bookings.service.js";
import { bookingAvailabilitySchema, createBookingSchema } from "./bookings.validation.js";

export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Recibe la reserva publica, valida formato HTTP y delega reglas al servicio.
  create = async (request: Request, response: Response): Promise<void> => {
    const parsedBody = createBookingSchema.safeParse(request.body);

    if (!parsedBody.success) {
      response.status(400).json({
        message: "Los datos enviados no son validos.",
        errors: parsedBody.error.flatten().fieldErrors
      });
      return;
    }

    try {
      const booking = await this.bookingsService.createBooking(parsedBody.data);

      response.status(201).json({
        message: "Reserva registrada correctamente.",
        data: booking
      });
    } catch (error) {
      if (error instanceof BookingValidationError) {
        response.status(400).json({
          message: error.message
        });
        return;
      }

      if (error instanceof BookingConflictError) {
        response.status(409).json({
          message: error.message
        });
        return;
      }

      response.status(500).json({
        message: error instanceof Error ? error.message : "Ocurrio un error inesperado al registrar la reserva."
      });
    }
  };

  // Devuelve disponibilidad para que el frontend arme el selector de bloques libres.
  getAvailability = async (request: Request, response: Response): Promise<void> => {
    const parsedQuery = bookingAvailabilitySchema.safeParse(request.query);

    if (!parsedQuery.success) {
      response.status(400).json({
        message: "Debes indicar una fecha valida para consultar disponibilidad.",
        errors: parsedQuery.error.flatten().fieldErrors
      });
      return;
    }

    try {
      const availability = await this.bookingsService.getAvailability(parsedQuery.data);

      response.json({
        message: "Disponibilidad obtenida correctamente.",
        data: availability
      });
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : "Ocurrio un error inesperado al consultar disponibilidad."
      });
    }
  };
}
