const bookingForm = document.querySelector(".booking-form");
const formStatus = document.querySelector("[data-form-status]");
const availabilityStatus = document.querySelector("[data-availability-status]");

const dateInput = bookingForm instanceof HTMLFormElement
  ? bookingForm.querySelector("#fecha")
  : null;

const serviceInput = bookingForm instanceof HTMLFormElement
  ? bookingForm.querySelector("#servicio")
  : null;

const timeInput = bookingForm instanceof HTMLFormElement
  ? bookingForm.querySelector("#hora")
  : null;

// Se usa para impedir seleccionar fechas anteriores al dia actual.
const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Permite filtrar bloques pasados cuando la reserva se hace para hoy.
const getCurrentTimeString = () => {
  const now = new Date();
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");

  return `${hours}:${minutes}`;
};

// Reinicia el selector cuando aun no hay suficiente contexto para mostrar horas validas.
const disableTimeSelect = (placeholder) => {
  if (!(timeInput instanceof HTMLSelectElement)) {
    return;
  }

  timeInput.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = placeholder;
  timeInput.append(option);
  timeInput.value = "";
  timeInput.disabled = true;
};

// Pinta unicamente los bloques reservables para la fecha y servicio seleccionados.
const fillTimeSelect = (timeOptions) => {
  if (!(timeInput instanceof HTMLSelectElement)) {
    return;
  }

  timeInput.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Selecciona una hora";
  timeInput.append(defaultOption);

  for (const time of timeOptions) {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    timeInput.append(option);
  }

  timeInput.disabled = timeOptions.length === 0;
};

// Defensa de frontend; el backend repite esta validacion como fuente de verdad.
const isPastAppointment = (date, time) => {
  if (!date || !time) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const appointmentDate = new Date(year, month - 1, day, hours, minutes, 0, 0);

  return appointmentDate.getTime() <= Date.now();
};

// Ajusta la fecha minima reservable en el navegador.
const updateMinimumDateTime = () => {
  if (!(dateInput instanceof HTMLInputElement)) {
    return;
  }

  const today = getTodayString();
  dateInput.min = today;
};

// Mensajes de apoyo para explicar disponibilidad u ocupacion al usuario final.
const renderAvailability = (date, service, occupiedTimes = [], availableTimes = []) => {
  if (!(availabilityStatus instanceof HTMLElement)) {
    return;
  }

  if (!date || !service) {
    availabilityStatus.textContent = "";
    availabilityStatus.dataset.state = "";
    return;
  }

  if (availableTimes.length === 0) {
    availabilityStatus.textContent = `No hay atencion disponible para ${service} en la fecha seleccionada.`;
    availabilityStatus.dataset.state = "warning";
    return;
  }

  if (occupiedTimes.length === 0) {
    availabilityStatus.textContent = `Todos los bloques de 40 minutos para ${service} estan disponibles.`;
    availabilityStatus.dataset.state = "success";
    return;
  }

  availabilityStatus.textContent = `Bloques ocupados para ${service}: ${occupiedTimes.join(", ")}`;
  availabilityStatus.dataset.state = "warning";
};

// Consulta al backend la disponibilidad real y sincroniza el selector de horas.
const loadAvailability = async () => {
  if (!(dateInput instanceof HTMLInputElement) || !(serviceInput instanceof HTMLSelectElement)) {
    return [];
  }

  updateMinimumDateTime();

  if (!serviceInput.value) {
    renderAvailability("", "");
    disableTimeSelect("Selecciona un servicio primero");
    return [];
  }

  if (!dateInput.value) {
    renderAvailability("", "");
    disableTimeSelect("Selecciona una fecha primero");
    return [];
  }

  if (!(availabilityStatus instanceof HTMLElement)) {
    return [];
  }

  availabilityStatus.textContent = "Consultando horas reservadas...";
  availabilityStatus.dataset.state = "loading";

  try {
    const response = await fetch(
      `/api/bookings/availability?date=${encodeURIComponent(dateInput.value)}&service=${encodeURIComponent(serviceInput.value)}`
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No se pudo consultar la disponibilidad.");
    }

    const occupiedTimes = Array.isArray(result.data?.occupiedTimes)
      ? result.data.occupiedTimes
      : [];
    const availableTimes = Array.isArray(result.data?.availableTimes)
      ? result.data.availableTimes
      : [];
    const currentTime = getCurrentTimeString();
    const filteredTimes = availableTimes.filter((time) => {
      if (dateInput.value !== getTodayString()) {
        return true;
      }

      return time > currentTime;
    });

    const openTimes = filteredTimes.filter((time) => !occupiedTimes.includes(time));

    if (openTimes.length === 0) {
      disableTimeSelect("No hay bloques disponibles");
    } else {
      fillTimeSelect(openTimes);
    }

    renderAvailability(dateInput.value, serviceInput.value, occupiedTimes, availableTimes);
    return occupiedTimes;
  } catch (error) {
    disableTimeSelect("No se pudo cargar la disponibilidad");
    availabilityStatus.textContent = error instanceof Error
      ? error.message
      : "No se pudo consultar la disponibilidad.";
    availabilityStatus.dataset.state = "error";
    return [];
  }
};

if (bookingForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  // Cada servicio tiene agenda propia, por eso al cambiarlo recalculamos bloques.
  if (serviceInput instanceof HTMLSelectElement) {
    serviceInput.addEventListener("change", async () => {
      if (timeInput instanceof HTMLSelectElement) {
        timeInput.value = "";
      }

      await loadAvailability();
    });
  }

  // La fecha redefine disponibilidad y tambien filtra bloques ya vencidos si es hoy.
  if (dateInput instanceof HTMLInputElement) {
    dateInput.addEventListener("change", async () => {
      if (timeInput instanceof HTMLSelectElement) {
        timeInput.value = "";
      }

      await loadAvailability();
    });
  }

  if (timeInput instanceof HTMLSelectElement) {
    timeInput.addEventListener("change", () => {
      updateMinimumDateTime();
    });
  }

  updateMinimumDateTime();
  disableTimeSelect("Selecciona un servicio primero");

  // El submit usa validaciones tempranas en cliente, pero la validacion final vive en backend.
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const payload = {
      ownerName: formData.get("nombre-dueno")?.toString().trim() ?? "",
      petName: formData.get("nombre-mascota")?.toString().trim() ?? "",
      petType: formData.get("tipo")?.toString().trim() ?? "",
      service: formData.get("servicio")?.toString().trim() ?? "",
      appointmentDate: formData.get("fecha")?.toString().trim() ?? "",
      appointmentTime: formData.get("hora")?.toString().trim() ?? "",
      phone: formData.get("telefono")?.toString().trim() ?? "",
      notes: formData.get("mensaje")?.toString().trim() ?? ""
    };

    if (isPastAppointment(payload.appointmentDate, payload.appointmentTime)) {
      formStatus.textContent = "No puedes reservar una fecha u hora anterior al momento actual.";
      formStatus.dataset.state = "error";
      return;
    }

    const occupiedTimes = await loadAvailability();

    if (occupiedTimes.includes(payload.appointmentTime)) {
      formStatus.textContent = "La hora seleccionada ya se encuentra reservada. Elige otra opcion.";
      formStatus.dataset.state = "error";
      return;
    }

    const submitButton = bookingForm.querySelector('button[type="submit"]');

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    formStatus.textContent = "Estamos enviando tu solicitud...";
    formStatus.dataset.state = "loading";

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No se pudo registrar la reserva.");
      }

      bookingForm.reset();
      disableTimeSelect("Selecciona un servicio primero");
      renderAvailability("", "");
      formStatus.textContent = "Reserva enviada con exito. Te contactaremos para confirmar la hora.";
      formStatus.dataset.state = "success";
    } catch (error) {
      formStatus.textContent = error instanceof Error
        ? error.message
        : "Ocurrio un error al enviar la reserva.";
      formStatus.dataset.state = "error";
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = "Confirmar solicitud";
      }
    }
  });
}
