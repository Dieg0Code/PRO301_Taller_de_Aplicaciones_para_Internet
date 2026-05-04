export type BookingStatus = "pendiente" | "confirmada" | "cancelada";

export interface CreateBookingInput {
  ownerName: string;
  petName: string;
  petType: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  phone: string;
  notes?: string;
}

export interface Booking extends CreateBookingInput {
  id: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingAvailability {
  date: string;
  service: string;
  occupiedTimes: string[];
  availableTimes: string[];
}
