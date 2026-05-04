import type { SERVICES } from "./bookings.constants.js";

// Todos los servicios trabajan con bloques operativos fijos de 40 minutos.
const SLOT_DURATION_MINUTES = 40;

type DailySchedule = {
  start: string;
  end: string;
};

type ServiceSchedule = {
  weekday: DailySchedule;
  saturday: DailySchedule | null;
};

type ServiceName = (typeof SERVICES)[number];

// Esta configuracion concentra las franjas horarias por motivo de consulta.
const SERVICE_SCHEDULES: Record<ServiceName, ServiceSchedule> = {
  "Consulta general": {
    weekday: {
      start: "09:00",
      end: "13:00"
    },
    saturday: {
      start: "10:00",
      end: "13:20"
    }
  },
  "Vacunación": {
    weekday: {
      start: "15:00",
      end: "19:00"
    },
    saturday: {
      start: "10:00",
      end: "12:40"
    }
  },
  "Control preventivo": {
    weekday: {
      start: "11:00",
      end: "18:20"
    },
    saturday: {
      start: "11:20",
      end: "14:00"
    }
  }
};

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours * 60) + minutes;
};

const toTimeLabel = (totalMinutes: number): string => {
  const hours = `${Math.floor(totalMinutes / 60)}`.padStart(2, "0");
  const minutes = `${totalMinutes % 60}`.padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getScheduleForDate = (date: string, service: string): DailySchedule | null => {
  const [year, month, day] = date.split("-").map(Number);
  const weekDay = new Date(year, month - 1, day).getDay();
  const serviceSchedule = SERVICE_SCHEDULES[service as ServiceName];

  if (!serviceSchedule) {
    return null;
  }

  if (weekDay >= 1 && weekDay <= 5) {
    return serviceSchedule.weekday;
  }

  if (weekDay === 6) {
    return serviceSchedule.saturday;
  }

  return null;
};

// Genera la grilla completa de horas validas para una fecha y servicio.
export const getAvailableTimeSlotsForDate = (date: string, service: string): string[] => {
  const schedule = getScheduleForDate(date, service);

  if (!schedule) {
    return [];
  }

  const startMinutes = parseTime(schedule.start);
  const endMinutes = parseTime(schedule.end);
  const slots: string[] = [];

  for (let current = startMinutes; current + SLOT_DURATION_MINUTES <= endMinutes; current += SLOT_DURATION_MINUTES) {
    slots.push(toTimeLabel(current));
  }

  return slots;
};

// Defensa de backend para rechazar horas manipuladas desde el cliente.
export const isValidTimeSlotForDate = (date: string, time: string, service: string): boolean => {
  return getAvailableTimeSlotsForDate(date, service).includes(time);
};
