const authSection = document.querySelector("[data-admin-auth]");
const dashboardSection = document.querySelector("[data-admin-dashboard]");
const loginForm = document.querySelector(".admin-login-form");
const authStatus = document.querySelector("[data-admin-auth-status]");
const tableStatus = document.querySelector("[data-admin-table-status]");
const bookingsBody = document.querySelector("[data-admin-bookings-body]");
const welcomeText = document.querySelector("[data-admin-welcome]");
const adminCount = document.querySelector("[data-admin-count]");
const refreshButton = document.querySelector("[data-admin-refresh]");
const logoutButton = document.querySelector("[data-admin-logout]");

// Formato breve pensado para lectura operativa dentro del panel.
const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

// Alterna entre login y dashboard segun el estado de autenticacion.
const setAuthView = (authenticated) => {
  if (authSection instanceof HTMLElement) {
    authSection.hidden = authenticated;
  }

  if (dashboardSection instanceof HTMLElement) {
    dashboardSection.hidden = !authenticated;
  }
};

// Unifica mensajes de carga, exito y error del panel admin.
const setStatusMessage = (element, message, state = "") => {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.textContent = message;
  element.dataset.state = state;
};

// Renderiza la tabla operativa y una fila vacia cuando no hay reservas.
const renderBookings = (bookings) => {
  if (!(bookingsBody instanceof HTMLElement)) {
    return;
  }

  if (bookings.length === 0) {
    bookingsBody.innerHTML = `
      <tr>
        <td colspan="8">No hay reservas agendadas en este momento.</td>
      </tr>
    `;
    if (adminCount instanceof HTMLElement) {
      adminCount.textContent = "0 reservas";
    }
    return;
  }

  bookingsBody.innerHTML = bookings.map((booking) => `
    <tr>
      <td>${formatDate(booking.appointmentDate)}</td>
      <td>${booking.appointmentTime}</td>
      <td>${booking.service}</td>
      <td>${booking.ownerName}</td>
      <td>${booking.petName} (${booking.petType})</td>
      <td>${booking.phone}</td>
      <td><span class="admin-status-pill admin-status-pill--${booking.status}">${booking.status}</span></td>
      <td>
        <button class="button button-secondary admin-delete-button" type="button" data-booking-id="${booking.id}">
          Eliminar
        </button>
      </td>
    </tr>
  `).join("");

  if (adminCount instanceof HTMLElement) {
    adminCount.textContent = `${bookings.length} reserva${bookings.length === 1 ? "" : "s"}`;
  }
};

// Ejecuta el borrado desde el panel admin y luego sincroniza nuevamente la tabla con la base de datos.
const deleteBooking = async (bookingId) => {
  const confirmed = window.confirm("Esta accion eliminara la reserva de forma permanente. Deseas continuar?");

  if (!confirmed) {
    return;
  }

  setStatusMessage(tableStatus, "Eliminando reserva...", "loading");

  try {
    const response = await fetch(`/api/admin/bookings/${encodeURIComponent(bookingId)}`, {
      method: "DELETE",
      credentials: "same-origin"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No fue posible eliminar la reserva.");
    }

    await loadBookings();
    setStatusMessage(tableStatus, "Reserva eliminada correctamente.", "success");
  } catch (error) {
    setStatusMessage(
      tableStatus,
      error instanceof Error ? error.message : "No fue posible eliminar la reserva.",
      "error"
    );
  }
};

// Carga el listado protegido de reservas para el dashboard.
const loadBookings = async () => {
  setStatusMessage(tableStatus, "Cargando reservas...", "loading");

  try {
    const response = await fetch("/api/admin/bookings", {
      credentials: "same-origin"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No se pudieron cargar las reservas.");
    }

    renderBookings(Array.isArray(result.data) ? result.data : []);
    setStatusMessage(tableStatus, "Reservas cargadas correctamente.", "success");
  } catch (error) {
    renderBookings([]);
    setStatusMessage(
      tableStatus,
      error instanceof Error ? error.message : "No se pudieron cargar las reservas.",
      "error"
    );
  }
};

// Intenta restaurar una sesion existente leyendo el estado desde backend.
const restoreSession = async () => {
  try {
    const response = await fetch("/api/admin/session", {
      credentials: "same-origin"
    });

    const result = await response.json();

    if (!response.ok || !result.data?.authenticated) {
      setAuthView(false);
      return;
    }

    setAuthView(true);

    if (welcomeText instanceof HTMLElement) {
      welcomeText.textContent = `Sesion iniciada como ${result.data.username}.`;
    }

    await loadBookings();
  } catch {
    setAuthView(false);
  }
};

if (loginForm instanceof HTMLFormElement) {
  // El login se resuelve en backend para no exponer credenciales ni logica de sesion.
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = loginForm.querySelector('button[type="submit"]');

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Ingresando...";
    }

    setStatusMessage(authStatus, "Validando credenciales...", "loading");

    try {
      const formData = new FormData(loginForm);
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.get("username")?.toString().trim() ?? "",
          password: formData.get("password")?.toString() ?? ""
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No fue posible iniciar sesion.");
      }

      setAuthView(true);
      if (welcomeText instanceof HTMLElement) {
        welcomeText.textContent = `Sesion iniciada como ${result.data.username}.`;
      }
      setStatusMessage(authStatus, "");
      loginForm.reset();
      await loadBookings();
    } catch (error) {
      setStatusMessage(
        authStatus,
        error instanceof Error ? error.message : "No fue posible iniciar sesion.",
        "error"
      );
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = "Ingresar";
      }
    }
  });
}

if (refreshButton instanceof HTMLButtonElement) {
  // Permite refrescar reservas sin recargar toda la pagina.
  refreshButton.addEventListener("click", async () => {
    await loadBookings();
  });
}

if (logoutButton instanceof HTMLButtonElement) {
  // Tras cerrar sesion, se limpia la UI local aunque la cookie ya se invalida en backend.
  logoutButton.addEventListener("click", async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin"
    });

    setAuthView(false);
    setStatusMessage(tableStatus, "");
    if (bookingsBody instanceof HTMLElement) {
      bookingsBody.innerHTML = `
        <tr>
          <td colspan="8">Inicia sesion para cargar las reservas.</td>
        </tr>
      `;
    }
    if (welcomeText instanceof HTMLElement) {
      welcomeText.textContent = "";
    }
    if (adminCount instanceof HTMLElement) {
      adminCount.textContent = "0 reservas";
    }
  });
}

if (bookingsBody instanceof HTMLElement) {
  // Delegamos el click de eliminar sobre la tabla para soportar filas renderizadas dinamicamente.
  bookingsBody.addEventListener("click", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const deleteButton = target.closest("[data-booking-id]");

    if (!(deleteButton instanceof HTMLButtonElement)) {
      return;
    }

    const bookingId = deleteButton.dataset.bookingId;

    if (!bookingId) {
      return;
    }

    await deleteBooking(bookingId);
  });
}

// Punto de entrada del panel admin.
restoreSession();
