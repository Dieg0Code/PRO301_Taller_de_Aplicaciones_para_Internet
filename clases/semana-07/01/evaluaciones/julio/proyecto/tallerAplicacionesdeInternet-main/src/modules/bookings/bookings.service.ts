import type { Booking, BookingAvailability } from "./bookings.types.js";
import type { BookingAvailabilityDto, CreateBookingDto } from "./bookings.validation.js";
import { BookingConflictError, BookingValidationError } from "./bookings.errors.js";
import { BookingsRepository } from "./bookings.repository.js";
import { getAvailableTimeSlotsForDate, isValidTimeSlotForDate } from "./bookings.schedule.js";

// Convierte fecha+hora en un Date local para comparar con el momento actual del servidor.
const buildLocalAppointmentDate = (date: string, time: string): Date => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
};

export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  // Aplica las reglas de negocio de reservas antes de escribir en la base de datos.
  async createBooking(input: CreateBookingDto): Promise<Booking> {
    const appointmentDate = buildLocalAppointmentDate(input.appointmentDate, input.appointmentTime);
    const now = new Date();

    if (Number.isNaN(appointmentDate.getTime()) || appointmentDate <= now) {
      throw new BookingValidationError("No puedes reservar una fecha u hora anterior al momento actual.");
    }

    if (!isValidTimeSlotForDate(input.appointmentDate, input.appointmentTime, input.service)) {
      throw new BookingValidationError(
        "La hora seleccionada no corresponde a un bloque valido para el servicio elegido."
      );
    }

    const existingBooking = await this.bookingsRepository.findByDateAndTime(
      input.appointmentDate,
      input.appointmentTime,
      input.service
    );

    if (existingBooking) {
      throw new BookingConflictError("La hora seleccionada ya se encuentra reservada.");
    }

    return this.bookingsRepository.create({
      ...input,
      notes: input.notes?.trim() || ""
    });
  }

  // Combina la agenda teorica del servicio con las horas ocupadas guardadas en base de datos.
  async getAvailability(input: BookingAvailabilityDto): Promise<BookingAvailability> {
    const occupiedTimes = await this.bookingsRepository.listOccupiedTimesByDate(input.date, input.service);
    const availableTimes = getAvailableTimeSlotsForDate(input.date, input.service);

    return {
      date: input.date,
      service: input.service,
      occupiedTimes,
      availableTimes
    };
  }
}
