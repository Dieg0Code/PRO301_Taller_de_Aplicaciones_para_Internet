import { supabase } from "../../lib/supabase.js";
import type { Booking, CreateBookingInput } from "./bookings.types.js";
import { BookingConflictError } from "./bookings.errors.js";

const TABLE_NAME = "bookings";

type BookingRow = {
  id: string;
  owner_name: string;
  pet_name: string;
  pet_type: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  phone: string;
  notes: string | null;
  status: "pendiente" | "confirmada" | "cancelada";
  created_at: string;
};

const toDomain = (row: BookingRow): Booking => ({
  id: row.id,
  ownerName: row.owner_name,
  petName: row.pet_name,
  petType: row.pet_type,
  service: row.service,
  appointmentDate: row.appointment_date,
  appointmentTime: row.appointment_time,
  phone: row.phone,
  notes: row.notes ?? "",
  status: row.status,
  createdAt: row.created_at
});

export class BookingsRepository {
  // Consulta las reservas activas para poblar el panel administrativo.
  async listScheduled(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .in("status", ["pendiente", "confirmada"])
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) {
      throw new Error(`No fue posible obtener las reservas: ${error.message}`);
    }

    return (data ?? []).map((row) => toDomain(row as BookingRow));
  }

  // Elimina una reserva por id para tareas administrativas de limpieza o correccion.
  async deleteById(id: string): Promise<void> {
    // Este borrado es fisico: si el equipo necesita auditoria, conviene migrarlo a cancelacion logica.
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`No fue posible eliminar la reserva: ${error.message}`);
    }
  }

  // Busca si ya existe una reserva activa para la misma fecha, hora y servicio.
  async findByDateAndTime(
    appointmentDate: string,
    appointmentTime: string,
    service: string
  ): Promise<Booking | null> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("appointment_date", appointmentDate)
      .eq("appointment_time", appointmentTime)
      .eq("service", service)
      .in("status", ["pendiente", "confirmada"])
      .maybeSingle<BookingRow>();

    if (error) {
      throw new Error(`No fue posible consultar la disponibilidad: ${error.message}`);
    }

    return data ? toDomain(data) : null;
  }

  // Obtiene las horas ya ocupadas de un servicio en una fecha concreta.
  async listOccupiedTimesByDate(appointmentDate: string, service: string): Promise<string[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("appointment_time")
      .eq("appointment_date", appointmentDate)
      .eq("service", service)
      .in("status", ["pendiente", "confirmada"])
      .order("appointment_time", { ascending: true });

    if (error) {
      throw new Error(`No fue posible consultar las horas ocupadas: ${error.message}`);
    }

    return (data ?? []).map((row) => String(row.appointment_time).slice(0, 5));
  }

  // Inserta una nueva reserva en Supabase.
  async create(data: CreateBookingInput): Promise<Booking> {
    const { data: createdBooking, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        owner_name: data.ownerName,
        pet_name: data.petName,
        pet_type: data.petType,
        service: data.service,
        appointment_date: data.appointmentDate,
        appointment_time: data.appointmentTime,
        phone: data.phone,
        notes: data.notes || null,
        status: "pendiente"
      })
      .select()
      .single<BookingRow>();

    if (error) {
      if (error.code === "23505") {
        throw new BookingConflictError("La hora seleccionada ya fue reservada por otro cliente.");
      }

      throw new Error(`No fue posible guardar la reserva: ${error.message}`);
    }

    return toDomain(createdBooking);
  }
}
