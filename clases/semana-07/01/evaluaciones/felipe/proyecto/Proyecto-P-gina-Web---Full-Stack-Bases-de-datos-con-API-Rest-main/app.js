/**
 * app.js — Pokémon TCG Frontend
 * ===============================
 * Conecta los formularios de Login, Registro y Perfil con la API FastAPI.
 * Vinculado en index.html con:  <script src="app.js" defer></script>
 */

const API_BASE = window.location.origin;
// ══════════════════════════════════════════
// DATOS POKÉDEX (26 POKÉMON)
// ══════════════════════════════════════════

// Pendiente de incorporación en bases de datos + API
const POKEMON_DATA = [
  { id: 1, num: "0001", name: "Bulbasaur", type: "Planta / Veneno", lore: "Lleva una semilla en el lomo desde que nace, la cual brota y crece con él.", img: "assets/poke_dx/800px-0001Bulbasaur.png" },
  { id: 2, num: "0002", name: "Ivysaur", type: "Planta / Veneno", lore: "Cuando la semilla de su lomo recibe nutrientes, brota una flor de gran tamaño.", img: "assets/poke_dx/800px-0002Ivysaur.png" },
  { id: 3, num: "0003", name: "Venusaur", type: "Planta / Veneno", lore: "Su flor se vuelve de un color vibrante si recibe suficiente luz solar.", img: "assets/poke_dx/375px-0003Venusaur.png" },
  { id: 4, num: "0004", name: "Charmander", type: "Fuego", lore: "La llama que tiene en la punta de la cola indica su salud y su estado de ánimo.", img: "assets/poke_dx/800px-0004Charmander.png" },
  { id: 5, num: "0005", name: "Charmeleon", type: "Fuego", lore: "En la emoción del combate, suelta llamas de un color azulado muy potente.", img: "assets/poke_dx/800px-0005Charmeleon.png" },
  { id: 6, num: "0006", name: "Charizard", type: "Fuego / Volador", lore: "Escupe fuego tan caliente que puede fundir hasta las rocas más duras.", img: "assets/poke_dx/800px-0006Charizard.png" },
  { id: 7, num: "0007", name: "Squirtle", type: "Agua", lore: "Se oculta dentro de su caparazón y contraataca lanzando agua a presión.", img: "assets/poke_dx/800px-0007Squirtle.png" },
  { id: 8, num: "0008", name: "Wartortle", type: "Agua", lore: "Se le considera un símbolo de longevidad. Su cola tiene un pelaje muy tupido.", img: "assets/poke_dx/800px-0008Wartortle.png" },
  { id: 9, num: "0009", name: "Blastoise", type: "Agua", lore: "Para acabar con su enemigo, lanza chorros de agua por los cañones de su caparazón.", img: "assets/poke_dx/800px-0009Blastoise.png" },
  { id: 10, num: "0010", name: "Caterpie", type: "Bicho", lore: "Sus antenas liberan un olor fétido para repeler a sus enemigos.", img: "assets/poke_dx/800px-0010Caterpie.png" },
  { id: 11, num: "0011", name: "Metapod", type: "Bicho", lore: "Su cuerpo es blando por dentro, pero su caparazón es tan duro como el acero.", img: "assets/poke_dx/800px-0011Metapod.png" },
  { id: 12, num: "0012", name: "Butterfree", type: "Bicho / Volador", lore: "Puede volar entre flores recogiendo polen gracias a sus grandes alas.", img: "assets/poke_dx/0012Butterfree.png" },
  { id: 13, num: "0013", name: "Weedle", type: "Bicho / Veneno", lore: "El aguijón de su cabeza es muy tóxico. Come hojas en los bosques.", img: "assets/poke_dx/800px-0013Weedle.png" },
  { id: 14, num: "0014", name: "Kakuna", type: "Bicho / Veneno", lore: "Casi no puede moverse, pero su cuerpo es capaz de endurecerse para defenderse.", img: "assets/poke_dx/800px-0014Kakuna.png" },
  { id: 15, num: "0015", name: "Beedrill", type: "Bicho / Veneno", lore: "Vuela a gran velocidad y ataca con sus tres aguijones venenosos.", img: "assets/poke_dx/800px-0015Beedrill.png" },
  { id: 16, num: "0016", name: "Pidgey", type: "Normal / Volador", lore: "Muy dócil. Si es atacado, suele lanzar arena para cegar al rival.", img: "assets/poke_dx/375px-0016Pidgey.png" },
  { id: 17, num: "0017", name: "Pidgeotto", type: "Normal / Volador", lore: "Posee una garras muy potentes. Vuela en círculos buscando presas.", img: "assets/poke_dx/800px-0017Pidgeotto.png" },
  { id: 18, num: "0018", name: "Pidgeot", type: "Normal / Volador", lore: "Vuela a una velocidad increíble. Sus plumas son de gran belleza.", img: "assets/poke_dx/800px-0018Pidgeot.png" },
  { id: 19, num: "0019", name: "Rattata", type: "Normal", lore: "Sus colmillos crecen sin parar, por lo que siempre está royendo algo.", img: "assets/poke_dx/800px-0019Rattata.png" },
  { id: 20, num: "0020", name: "Raticate", type: "Normal", lore: "Sus patas traseras son palmeadas, lo que le permite nadar por los ríos.", img: "assets/poke_dx/800px-0020Raticate.png" },
  { id: 21, num: "0021", name: "Spearow", type: "Normal / Volador", lore: "A diferencia de Pidgey, tiene un carácter muy agresivo y ruidoso.", img: "assets/poke_dx/800px-0021Spearow.png" },
  { id: 22, num: "0022", name: "Fearow", type: "Normal / Volador", lore: "Se caracteriza por tener un cuello y un pico muy largos, ideales para cazar.", img: "assets/poke_dx/800px-0022Fearow.png" },
  { id: 23, num: "0023", name: "Ekans", type: "Veneno", lore: "Se enrosca para descansar. Su lengua detecta el calor de sus presas.", img: "assets/poke_dx/800px-0023Ekans.png" },
  { id: 24, num: "0024", name: "Arbok", type: "Veneno", lore: "El patrón de su cara puede paralizar de miedo a sus enemigos.", img: "assets/poke_dx/800px-0024Arbok.png" },
  { id: 25, num: "0025", name: "Pikachu", type: "Eléctrico", lore: "Almacena electricidad en las mejillas. Si se siente amenazado, la suelta.", img: "assets/poke_dx/800px-0025Pikachu.png" },
  { id: 26, num: "0026", name: "Raichu", type: "Eléctrico", lore: "Su cola actúa como toma de tierra para liberar el exceso de energía.", img: "assets/poke_dx/800px-0026Raichu.png" },
];

// ══════════════════════════════════════════
// UTILIDADES COMPARTIDAS
// ══════════════════════════════════════════

/**
 * Cambia el estado visual de la SPA activando un radio button.
 * @param {string} stateId - ID del radio button a activar.
 */
function switchState(stateId) {
  const radio = document.getElementById(stateId);
  if (radio) {
    radio.checked = true;
    radio.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

/**
 * Crea o actualiza un banner de mensaje debajo de un elemento de referencia.
 * @param {string}      bannerId   - ID único del banner.
 * @param {HTMLElement} anchor     - Elemento al que se inserta el banner después.
 * @param {string}      msg        - Mensaje a mostrar. Vacío = ocultar.
 * @param {"error"|"success"} type - Tipo visual del banner.
 */
function setBanner(bannerId, anchor, msg, type = "error") {
  let banner = document.getElementById(bannerId);

  if (!banner) {
    banner = document.createElement("p");
    banner.id = bannerId;
    banner.setAttribute("role", "alert");
    banner.setAttribute("aria-live", "assertive");
    anchor.insertAdjacentElement("afterend", banner);
  }

  const styles = {
    error: {
      color: "#ff4d4d",
      bg: "rgba(255,77,77,0.1)",
      border: "rgba(255,77,77,0.4)",
    },
    success: {
      color: "rgba(57,255,20,1)",
      bg: "rgba(57,255,20,0.08)",
      border: "rgba(57,255,20,0.4)",
    },
  };
  const s = styles[type] || styles.error;

  banner.style.cssText = [
    `color: ${s.color}`,
    "font-size: 0.82rem",
    "font-weight: 600",
    "text-align: center",
    "padding: 0.45rem 0.75rem",
    "border-radius: 5px",
    `background: ${s.bg}`,
    `border: 1px solid ${s.border}`,
    "margin-top: 0.4rem",
    `display: ${msg ? "block" : "none"}`,
  ].join(";");

  banner.textContent = msg;
}

/**
 * Bloquea o desbloquea un botón durante una petición asíncrona.
 * @param {HTMLButtonElement} btn
 * @param {boolean}           loading
 * @param {string}            loadingText
 * @param {string}            defaultText
 */
function setButtonLoading(btn, loading, loadingText, defaultText) {
  btn.disabled = loading;
  btn.textContent = loading ? loadingText : defaultText;
}


// ══════════════════════════════════════════
// GESTIÓN DE SESIÓN
// ══════════════════════════════════════════

let currentUser = null;

function saveSession(user) {
  console.log("Guardando sesión para:", user.user_name);
  currentUser = user;
  localStorage.setItem("pokemon_session", JSON.stringify(user));
  window.dispatchEvent(new Event("storage"));
  updateAuthUI();
}

function loadSession() {
  const saved = localStorage.getItem("pokemon_session");
  console.log("Intentando cargar sesión desde localStorage:", saved ? "Existe" : "No existe");
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      console.log("Sesión cargada exitosamente para:", currentUser.user_name);
      updateAuthUI();
    } catch (e) {
      console.error("Error al cargar la sesión:", e);
      localStorage.removeItem("pokemon_session");
    }
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("pokemon_session");
  window.dispatchEvent(new Event("storage"));
  updateAuthUI();
  switchState("state-home");
  alert("Has cerrado sesión correctamente.");
}

function updateAuthUI() {
  const trigger = document.getElementById("auth-trigger");
  const text = document.getElementById("auth-text");

  if (currentUser) {
    text.textContent = `Bienvenido ${currentUser.user_name}`;
    trigger.setAttribute("for", "state-profile");
    trigger.classList.add("logged-in");

    // Rellenar campos del perfil
    const profileUser = document.getElementById("profile-username");
    const profileEmail = document.getElementById("profile-email");
    if (profileUser) profileUser.value = currentUser.user_name;
    if (profileEmail) profileEmail.value = currentUser.email;
  } else {
    text.textContent = "Iniciar sesión";
    trigger.setAttribute("for", "state-login");
    trigger.classList.remove("logged-in");
  }

  // Actualizar estados de corazones si existen
  document.querySelectorAll(".btn-fav").forEach(btn => {
    const cardId = parseInt(btn.dataset.cardId);
    if (currentUser && currentUser.favorite_ids && currentUser.favorite_ids.includes(cardId)) {
      btn.classList.add("is-favorite");
    } else {
      btn.classList.remove("is-favorite");
    }
  });
}


// ══════════════════════════════════════════
// FORMULARIO DE INICIO DE SESIÓN
// ══════════════════════════════════════════

function initLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Limpiar error previo
    setBanner("login-error", form.querySelector(".form-actions"), "");

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const submitBtn = form.querySelector("button[type='submit']");

    if (!email || !password) {
      setBanner("login-error", form.querySelector(".form-actions"),
        "Por favor, completa todos los campos.");
      return;
    }

    setButtonLoading(submitBtn, true, "Ingresando…", "Ingresar");

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        form.reset();
        saveSession(user);
        alert(`¡Bienvenido, ${user.user_name}! 👋`);
        switchState("state-home");
        return;
      }

      if (response.status === 401) {
        const err = await response.json().catch(() => ({}));
        setBanner("login-error", form.querySelector(".form-actions"),
          err.detail || "Credenciales incorrectas. Verifica tu email y contraseña.");
        return;
      }

      if (response.status === 422) {
        setBanner("login-error", form.querySelector(".form-actions"),
          "El usuario o correo electrónico ingresado no es válido.");
        return;
      }

      setBanner("login-error", form.querySelector(".form-actions"),
        "Error del servidor. Inténtalo de nuevo más tarde.");

    } catch {
      setBanner("login-error", form.querySelector(".form-actions"),
        "No se pudo conectar con el servidor. ¿Está el backend corriendo en localhost:8000?");
    } finally {
      setButtonLoading(submitBtn, false, "", "Ingresar");
    }
  });
}


// ══════════════════════════════════════════
// FORMULARIO DE REGISTRO
// ══════════════════════════════════════════

function initRegisterForm() {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Limpiar banners previos
    setBanner("reg-username-error", document.getElementById("reg-nombre"), "");
    setBanner("reg-email-error", form.querySelector(".form-actions"), "");

    const user_name = document.getElementById("reg-nombre").value.trim();
    const birth_date = document.getElementById("reg-datos").value;
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const submitBtn = form.querySelector("button[type='submit']");

    // Validación cliente
    if (!user_name || !birth_date || !email || !password) {
      setBanner("reg-email-error", form.querySelector(".form-actions"),
        "Por favor, completa todos los campos.");
      return;
    }

    setButtonLoading(submitBtn, true, "Creando cuenta…", "Crear Cuenta");

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, birth_date, email, password }),
      });

      // ✅ Registro exitoso
      if (response.status === 201) {
        const user = await response.json();
        form.reset();
        saveSession(user);
        alert(`¡Bienvenido, ${user.user_name}! Tu cuenta ha sido creada satisfactoriamente.`);
        switchState("state-home");
        return;
      }

      // ⚠️ Conflicto: email o usuario duplicado
      if (response.status === 409) {
        const err = await response.json().catch(() => ({}));
        const detail = err.detail || {};

        if (detail.field === "user_name") {
          // Error justo debajo del campo "Nombre de Usuario"
          setBanner("reg-username-error", document.getElementById("reg-nombre"),
            detail.msg || "El nombre de usuario ya está ocupado.");
        } else if (detail.field === "email") {
          // Error justo debajo del botón "Crear Cuenta"
          setBanner("reg-email-error", form.querySelector(".form-actions"),
            detail.msg || "El email ya se encuentra registrado.");
        } else {
          setBanner("reg-email-error", form.querySelector(".form-actions"),
            detail.msg || "Ya existe una cuenta con estos datos.");
        }
        return;
      }

      // ⚠️ Error de validación (ej. formato de fecha o email)
      if (response.status === 422) {
        setBanner("reg-email-error", form.querySelector(".form-actions"),
          "Hay errores en los datos ingresados. Verifica el formato del correo y la fecha.");
        return;
      }

      // ❌ Otro error del servidor
      setBanner("reg-email-error", form.querySelector(".form-actions"),
        "Error del servidor. Inténtalo de nuevo más tarde.");

    } catch {
      setBanner("reg-email-error", form.querySelector(".form-actions"),
        "No se pudo conectar con el servidor. ¿Está el backend corriendo en localhost:8000?");
    } finally {
      setButtonLoading(submitBtn, false, "", "Crear Cuenta");
    }
  });
}


// ══════════════════════════════════════════
// FORMULARIO DE PERFIL
// ══════════════════════════════════════════

function initProfileForm() {
  const form = document.getElementById("profile-form");
  if (!form) return;

  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    // Limpiar banners
    setBanner("profile-msg", form.querySelector(".form-actions"), "");

    const user_name = document.getElementById("profile-username").value.trim();
    const password = document.getElementById("profile-password").value;
    const submitBtn = form.querySelector("button[type='submit']");

    if (!user_name) {
      setBanner("profile-msg", form.querySelector(".form-actions"), "El nombre de usuario no puede estar vacío.");
      return;
    }

    const payload = { user_name };
    if (password) payload.password = password;

    setButtonLoading(submitBtn, true, "Guardando…", "Guardar Cambios");

    try {
      const response = await fetch(`${API_BASE}/api/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        saveSession(updatedUser);
        document.getElementById("profile-password").value = ""; // Limpiar campo password
        setBanner("profile-msg", form.querySelector(".form-actions"), "¡Perfil actualizado con éxito! 👋", "success");
        return;
      }

      if (response.status === 409) {
        const err = await response.json().catch(() => ({}));
        const msg = err.detail?.msg || "Ese nombre de usuario ya está en uso. Prueba con otro.";
        setBanner("profile-msg", form.querySelector(".form-actions"), msg, "error");
        return;
      }

      const errorData = await response.json().catch(() => ({}));
      setBanner("profile-msg", form.querySelector(".form-actions"), errorData.detail || "Error al actualizar el perfil.");

    } catch {
      setBanner("profile-msg", form.querySelector(".form-actions"), "No se pudo conectar con el servidor.");
    } finally {
      setButtonLoading(submitBtn, false, "", "Guardar Cambios");
    }
  });
}


// ══════════════════════════════════════════
// LÓGICA DE INTERACCIÓN 3D (Portado de JS_animation)
// ══════════════════════════════════════════

/**
 * Añade la funcionalidad de rotación 3D mediante clic mantenido a un elemento.
 * @param {HTMLElement} element - El sobre o carta a interactuar.
 */
function attach3DInteraction(element) {
  let isPressed = false;
  // Buscamos el contenedor interno que rotará
  const inner = element.querySelector(".pack-inner, .card-inner");
  const holoOverlay = element.querySelector(".holo-gradient-layer");

  if (!inner) return;

  const startInteraction = (e) => {
    if (window.innerWidth < 768) return;

    // Detectamos si esta carta específica ya está abierta en modo detalle
    const slotIdx = element.classList.contains("card-1") ? "1" :
      element.classList.contains("card-2") ? "2" :
        element.classList.contains("card-3") ? "3" : "4";
    const radio = document.getElementById(`card-${slotIdx}-selected`);

    if (radio && radio.checked) {
      // Si ya está abierta, evitamos que el clic la cierre
      if (e) {
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
      }
    }

    isPressed = true;
    inner.style.transition = "none";
    element.classList.add("is-pressed");
  };

  const endInteraction = () => {
    if (!isPressed) return;
    isPressed = false;
    // Restaurar transición suave al soltar
    inner.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    inner.style.transform = "rotateY(0deg) rotateX(0deg)";

    if (holoOverlay) {
      holoOverlay.style.backgroundPosition = "0% 50%";
    }
    element.classList.remove("is-pressed");
  };

  const handleMove = (x, y) => {
    if (!isPressed || window.innerWidth < 768) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Aumentar sensibilidad (+/- 35 grados para una respuesta más ágil)
    const rotateY = ((x - centerX) / (rect.width / 2)) * 35;
    const rotateX = ((y - centerY) / (rect.height / 2)) * -35;

    // Aplicamos escala de "preview" + rotación
    inner.style.transform = `scale(1.12) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    // Mover el gradiente holográfico (ajuste de brillo más dinámico)
    if (holoOverlay) {
      const bgX = 50 + rotateY * 2.5;
      const bgY = 50 - rotateX * 2.5;
      holoOverlay.style.backgroundPosition = `${bgX}% ${bgY}%`;
    }
  };

  // Eventos PC
  element.addEventListener("mousedown", startInteraction);
  window.addEventListener("mouseup", endInteraction);
  window.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY));

  // Eventos Móvil
  element.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) startInteraction();
  }, { passive: true });
  window.addEventListener("touchend", endInteraction);
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });
}


// ══════════════════════════════════════════
// CARGA DINÁMICA DE RECURSOS (API)
// ══════════════════════════════════════════

/**
 * Carga las cartas desde la API y las inyecta en el DOM.
 * Cumple con el requisito de "Visualización que muestre datos reales de la API".
 */
async function loadCards() {
  const container = document.getElementById("cards-container");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE}/api/cards`);
    if (!response.ok) throw new Error("No se pudieron cargar las cartas.");

    const cards = await response.json();

    // Agrupamos por slot_index para reconstruir la estructura del HTML original
    const groups = {};
    cards.forEach(c => {
      if (!groups[c.slot_index]) groups[c.slot_index] = [];
      groups[c.slot_index].push(c);
    });

    container.innerHTML = ""; // Limpiar placeholder

    Object.keys(groups).sort().forEach(slotIdx => {
      const slotCards = groups[slotIdx];
      const li = document.createElement("li");
      li.className = `card-slot slot-${slotIdx}`;

      // Construimos el HTML interno preservando las clases para CSS
      li.innerHTML = `
        <label for="card-${slotIdx}-selected" class="card-label">
            <figure class="card card-${slotIdx}">
                <div class="card-inner">
                    <div class="card-front" aria-label="Carta de Pokémon"></div>
                    <div class="card-back" aria-hidden="true"></div>
                    <i class="holo-gradient-layer" aria-hidden="true"></i>
                </div>
            </figure>
        </label>
        <article class="card-details">
            ${slotCards.map(c => `
              <div class="info-pack-${c.pack_type.toLowerCase()}">
                  <h2>
                    ${c.name}
                    <button class="btn-fav" data-card-id="${c.id}" aria-label="Añadir a favoritos">
                      <svg class="fav-icon" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </h2>
                  <p>${c.description}</p>
              </div>
            `).join("")}
            <label for="card-none" class="close-details-btn">Cerrar Detalle</label>
        </article>
      `;
      container.appendChild(li);

      // Adjuntar interacción 3D a la nueva carta cargada
      const cardEl = li.querySelector(".card");
      if (cardEl) attach3DInteraction(cardEl);

      // Adjuntar evento de favoritos
      li.querySelectorAll(".btn-fav").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          toggleFavorite(parseInt(btn.dataset.cardId), btn);
        });
      });
    });

    console.log("Cartas cargadas dinámicamente desde la API.");
  } catch (error) {
    console.error("Error al cargar cartas:", error);
    container.innerHTML = `<p class="error-text">Error al conectar con la Pokedex de la API.</p>`;
  }
}

/**
 * Carga la lista de usuarios para la sección de Comunidad.
 * Cumple con el requisito de "Consultar la base de datos y devolver lista".
 */
async function loadCommunity() {
  const container = document.getElementById("community-list-container");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE}/api/users`);
    if (!response.ok) throw new Error("No se pudo cargar la comunidad.");

    const users = await response.json();

    if (users.length === 0) {
      container.innerHTML = "<p>¡Sé el primer entrenador en unirte!</p>";
      return;
    }

    // Crear una tabla semántica para mostrar los datos reales
    const table = document.createElement("table");
    table.className = "community-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Entrenador</th>
          <th>ID</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td><strong>${u.user_name}</strong></td>
            <td>#${u.id}</td>
            <td>${u.email}</td>
          </tr>
        `).join("")}
      </tbody>
    `;

    container.innerHTML = "";
    container.appendChild(table);
    console.log("Comunidad cargada desde la API.");
  } catch (error) {
    console.error("Error al cargar comunidad:", error);
    container.innerHTML = "<p>Error al cargar los datos de la comunidad.</p>";
  }
}

/**
 * Gestiona la lógica de favoritos:
 * 1. Verifica si el usuario está logueado.
 * 2. Si no, redirige al inicio y abre el login.
 * 3. Si sí, alterna el estado en la base de datos y actualiza la UI.
 */
async function toggleFavorite(cardId, btn) {
  if (!currentUser) {
    alert("¡Debes iniciar sesión para guardar tus cartas favoritas!");
    switchState("state-home");
    // Pequeño delay para asegurar que el scroll-behavior no interfiera con la visibilidad
    setTimeout(() => switchState("state-login"), 100);
    return;
  }

  // Feedback inmediato en la UI
  btn.classList.toggle("is-favorite");

  try {
    const response = await fetch(`${API_BASE}/api/favorites/${cardId}?user_id=${currentUser.id}`, {
      method: "POST",
    });

    if (response.ok) {
      const updatedUser = await response.json();
      saveSession(updatedUser);
      console.log("Favorito actualizado en servidor.");
    } else {
      // Revertir si falló la comunicación
      btn.classList.toggle("is-favorite");
      alert("No se pudo guardar el favorito. Inténtalo de nuevo.");
    }
  } catch (error) {
    console.error("Error al guardar favorito:", error);
    btn.classList.toggle("is-favorite");
  }
}


// ══════════════════════════════════════════
// LÓGICA DE POKÉDEX
// ══════════════════════════════════════════

/**
 * Renderiza la lista de Pokémon en el carrusel.
 * @param {Array} list - Lista de Pokémon filtrada/ordenada.
 */
function renderPokedex(list) {
  const container = document.getElementById("pokedex-list");
  if (!container) return;

  container.innerHTML = list.map(p => `
    <article class="pokedex-card">
      <div class="pk-img-container">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="pk-info">
        <span class="pk-number">#${p.num}</span>
        <h3 class="pk-name">${p.name}</h3>
        <span class="pk-type">${p.type}</span>
        <p class="pk-lore">${p.lore}</p>
      </div>
    </article>
  `).join("");
}

/**
 * Inicializa los controles de la Pokédex.
 */
function initPokedex() {
  const sortSelect = document.getElementById("pokedex-sort");
  const carousel = document.getElementById("pokedex-list");
  const prevBtn = document.getElementById("pokedex-prev");
  const nextBtn = document.getElementById("pokedex-next");

  if (!sortSelect || !carousel) return;

  // Render inicial
  renderPokedex(POKEMON_DATA);

  // Lógica de ordenamiento
  sortSelect.addEventListener("change", () => {
    const val = sortSelect.value;
    let sorted = [...POKEMON_DATA];

    if (val === "num-asc") sorted.sort((a, b) => a.id - b.id);
    else if (val === "num-desc") sorted.sort((a, b) => b.id - a.id);
    else if (val === "alpha-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (val === "alpha-desc") sorted.sort((a, b) => b.name.localeCompare(a.name));

    renderPokedex(sorted);
    carousel.scrollLeft = 0; // Reiniciar scroll al ordenar
  });

  // Navegación del carrusel
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -350, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: 350, behavior: "smooth" });
    });
  }

  // Detectar activación de la pestaña Pokédex para efectos visuales si fuera necesario
  document.getElementById("state-pokedex")?.addEventListener("change", (e) => {
    if (e.target.checked) {
      console.log("Pokédex abierta");
      // Podríamos disparar alguna animación aquí
    }
  });
}


// ══════════════════════════════════════════
// INICIALIZACIÓN
// ══════════════════════════════════════════

function init() {
  console.log("Iniciando aplicación Pokémon TCG...");
  loadSession();
  initLoginForm();
  initRegisterForm();
  initProfileForm();
  loadCards();
  loadCommunity();
  initPokedex();
  initAdminPanel();

  // Adjuntar interacción 3D a los sobres iniciales
  document.querySelectorAll(".pack").forEach(pack => {
    attach3DInteraction(pack);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}


// ══════════════════════════════════════════
// PANEL DE ADMINISTRADOR
// ══════════════════════════════════════════

/**
 * Abre el modal semitransparente de código de administrador.
 * Solo se muestra si el usuario ha iniciado sesión.
 */
function openAdminModal() {
  if (!currentUser) {
    alert("Debes iniciar sesión para acceder al modo administrador.");
    return;
  }

  // Si ya es admin, ir directo al panel
  if (currentUser.is_admin) {
    openAdminPanel();
    return;
  }

  const modal = document.getElementById("admin-code-modal");
  const input = document.getElementById("admin-code-input");
  const errorEl = document.getElementById("admin-code-error");

  if (!modal) return;

  // Limpiar estado previo
  if (input) input.value = "";
  if (errorEl) errorEl.textContent = "";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => input?.focus(), 100);
}

function closeAdminModal() {
  const modal = document.getElementById("admin-code-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

/**
 * Envía el código a la API. Si es correcto → promueve y abre el panel.
 */
async function confirmAdminCode() {
  const input = document.getElementById("admin-code-input");
  const errorEl = document.getElementById("admin-code-error");
  const confirmBtn = document.getElementById("btn-confirm-admin");
  if (!input || !currentUser) return;

  const code = input.value.trim();
  if (!code) {
    if (errorEl) errorEl.textContent = "Por favor, ingresa el código.";
    return;
  }

  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = "Verificando...";
  }
  if (errorEl) errorEl.textContent = "";

  try {
    const res = await fetch(`${API_BASE}/api/users/${currentUser.id}/make_admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret_code: code }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      saveSession(updatedUser);
      closeAdminModal();
      openAdminPanel();
    } else if (res.status === 403) {
      if (errorEl) errorEl.textContent = "Código incorrecto. Inténtalo de nuevo.";
      if (input) { input.value = ""; input.focus(); }
    } else {
      if (errorEl) errorEl.textContent = "Error del servidor. Inténtalo más tarde.";
    }
  } catch {
    if (errorEl) errorEl.textContent = "No se pudo conectar con el servidor.";
  } finally {
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.textContent = "Confirmar acceso";
    }
  }
}

// ─────────────────────────────────────────
// Panel principal de administración
// ─────────────────────────────────────────

function openAdminPanel() {
  const overlay = document.getElementById("admin-overlay");
  if (!overlay) return;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  loadAdminUsers();
}

function closeAdminPanel() {
  const overlay = document.getElementById("admin-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  closeActivityPanel(); // Ocultar subpanel por si estaba abierto
}

/**
 * Carga la lista completa de usuarios desde la API y rellena la tabla.
 */
async function loadAdminUsers() {
  const tbody = document.getElementById("admin-users-tbody");
  const countBadge = document.getElementById("admin-user-count");
  const statusDot = document.getElementById("status-dot");
  const statusLabel = document.getElementById("status-label");

  if (!tbody) return;

  // Estado inicial
  tbody.innerHTML = `<tr><td colspan="5" class="admin-loading">Consultando la API...</td></tr>`;
  if (statusDot) { statusDot.className = "status-dot"; }
  if (statusLabel) statusLabel.textContent = "Conectando con la API...";

  try {
    const res = await fetch(`${API_BASE}/api/users`);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const users = await res.json();

    // Actualizar barra de estado
    if (statusDot) statusDot.className = "status-dot online";
    if (statusLabel) statusLabel.textContent = `Conexión exitosa — ${users.length} usuarios obtenidos`;
    if (countBadge) countBadge.textContent = `${users.length} usuarios`;

    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="admin-loading">No hay usuarios registrados aún.</td></tr>`;
      return;
    }

    tbody.innerHTML = users.map(u => `
      <tr>
        <td style="color:#a78bfa;font-weight:700;">#${u.id}</td>
        <td><strong>${escapeHtml(u.user_name)}</strong></td>
        <td style="font-family:'Courier New',monospace;font-size:0.82rem;">${escapeHtml(u.email)}</td>
        <td>
          <span class="role-badge ${u.is_admin ? 'admin' : 'user'}">
            ${u.is_admin ? '&#9650; Admin' : 'Usuario'}
          </span>
        </td>
        <td>
          <button
            class="btn-view-activity"
            data-user-id="${u.id}"
            data-user-name="${escapeHtml(u.user_name)}"
            data-favorites='${JSON.stringify(u.favorite_pokemons || [])}'
            data-victories="${u.victories || 0}"
            aria-label="Ver actividad de ${escapeHtml(u.user_name)}"
          >
            &#128202; Ver actividad
          </button>
        </td>
      </tr>
    `).join("");

    // Adjuntar eventos a los botones de actividad
    tbody.querySelectorAll(".btn-view-activity").forEach(btn => {
      btn.addEventListener("click", () => {
        showActivityPanel(
          btn.dataset.userName,
          JSON.parse(btn.dataset.favorites),
          parseInt(btn.dataset.victories, 10)
        );
      });
    });

  } catch (err) {
    console.error("Error al cargar usuarios admin:", err);
    if (statusDot) statusDot.className = "status-dot offline";
    if (statusLabel) statusLabel.textContent = `Error de conexión: ${err.message}`;
    if (countBadge) countBadge.textContent = "Error";
    tbody.innerHTML = `<tr><td colspan="5" class="admin-loading" style="color:#f87171;">No se pudo conectar con la API. ¿Está el servidor corriendo?</td></tr>`;
  }
}

// ─────────────────────────────────────────
// Panel de actividad individual
// ─────────────────────────────────────────

function showActivityPanel(userName, favorites, victories) {
  const panel = document.getElementById("admin-activity-panel");
  const nameEl = document.getElementById("admin-activity-username");
  const favContainer = document.getElementById("activity-favorites");
  const victoriesEl = document.getElementById("victories-count");

  if (!panel) return;

  // Nombre del usuario
  if (nameEl) nameEl.textContent = userName;

  // Cartas favoritas
  if (favContainer) {
    if (favorites.length === 0) {
      favContainer.innerHTML = `<p class="admin-empty">Sin cartas favoritas registradas.</p>`;
    } else {
      favContainer.innerHTML = favorites
        .map(name => `<span class="pokemon-tag">&#10084; ${escapeHtml(name)}</span>`)
        .join("");
    }
  }

  // Victorias
  if (victoriesEl) victoriesEl.textContent = victories;

  panel.style.display = "block";
  // Scroll suave al panel
  setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}

function closeActivityPanel() {
  const panel = document.getElementById("admin-activity-panel");
  if (panel) panel.style.display = "none";
}

// ─────────────────────────────────────────
// Utilidad: escape HTML para prevenir XSS
// ─────────────────────────────────────────
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─────────────────────────────────────────
// Registro de eventos del panel de admin
// ─────────────────────────────────────────

function initAdminPanel() {
  // Botón en el perfil → abrir modal
  const btnAdminMode = document.getElementById("btn-admin-mode");
  if (btnAdminMode) {
    btnAdminMode.addEventListener("click", openAdminModal);
  }

  // Cerrar modal con X
  const btnCloseModal = document.getElementById("btn-close-admin-modal");
  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeAdminModal);
  }

  // Confirmar código
  const btnConfirm = document.getElementById("btn-confirm-admin");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", confirmAdminCode);
  }

  // Confirmar con Enter en el input
  const codeInput = document.getElementById("admin-code-input");
  if (codeInput) {
    codeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirmAdminCode();
      if (e.key === "Escape") closeAdminModal();
    });
  }

  // Cerrar modal al hacer clic fuera del cuadro
  const modal = document.getElementById("admin-code-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAdminModal();
    });
  }

  // Cerrar panel de administrador
  const btnCloseAdmin = document.getElementById("btn-close-admin");
  if (btnCloseAdmin) {
    btnCloseAdmin.addEventListener("click", closeAdminPanel);
  }

  // Volver desde el panel de actividad al listado
  const btnCloseActivity = document.getElementById("btn-close-activity");
  if (btnCloseActivity) {
    btnCloseActivity.addEventListener("click", closeActivityPanel);
  }

  // Cerrar panel con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const overlay = document.getElementById("admin-overlay");
      if (overlay?.classList.contains("is-open")) closeAdminPanel();
    }
  });
}

// Fin de app.js
