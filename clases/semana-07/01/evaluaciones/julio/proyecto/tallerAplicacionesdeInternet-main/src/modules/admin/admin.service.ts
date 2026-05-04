import type { Booking } from "../bookings/bookings.types.js";
import { BookingsRepository } from "../bookings/bookings.repository.js";

export class AdminService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  // El panel admin lista solo reservas activas para enfocar la operacion diaria.
  async listScheduledBookings(): Promise<Booking[]> {
    return this.bookingsRepository.listScheduled();
  }

  // El borrado fisico se reserva al panel admin para correcciones manuales de agenda.
  async deleteBooking(id: string): Promise<void> {
    await this.bookingsRepository.deleteById(id);
  }
}
