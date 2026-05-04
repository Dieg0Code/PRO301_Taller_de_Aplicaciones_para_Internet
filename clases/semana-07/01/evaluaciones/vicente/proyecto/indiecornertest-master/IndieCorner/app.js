const API_BASE_URL = "http://localhost:3000";
const ORDER_STATES = ["pendiente", "confirmado", "listo para retiro", "entregado", "cancelado"];

const productForm = document.querySelector("#producto-form");
const productMessage = document.querySelector("#producto-message");
const cancelProductEditButton = document.querySelector("#cancel-product-edit");
const reloadProductsButton = document.querySelector("#reload-products");
const productsState = document.querySelector("#products-state");
const productsList = document.querySelector("#products-list");
const orderProductSelect = document.querySelector('#pedido-form select[name="producto_id"]');

const orderForm = document.querySelector("#pedido-form");
const orderMessage = document.querySelector("#pedido-message");
const reloadOrdersButton = document.querySelector("#reload-orders");
const ordersState = document.querySelector("#orders-state");
const ordersList = document.querySelector("#orders-list");

const tabButtons = document.querySelectorAll("[data-tab-target]");
const tabPanels = document.querySelectorAll(".tab-panel");

let productsCache = [];
let ordersCache = [];

function getOrderStateClass(state) {
  const normalized = String(state || "pendiente")
    .toLowerCase()
    .replaceAll(" ", "-");

  return `state-${normalized}`;
}

function setMessage(element, text, type = "") {
  element.textContent = text;
  element.className = "feedback";

  if (type) {
    element.classList.add(`feedback--${type}`);
  }
}

function resetProductForm() {
  productForm.reset();
  productForm.elements.id.value = "";
  productForm.elements.precio.value = "0";
  productForm.elements.stock.value = "0";
  cancelProductEditButton.hidden = true;
}

function switchTab(target) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTarget === target);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `tab-${target}`);
  });
}

function fillProductOptions(products) {
  orderProductSelect.innerHTML = '<option value="">Selecciona un producto del catalogo</option>';

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.nombre} | Stock: ${product.stock}`;
    orderProductSelect.appendChild(option);
  });
}

function formatPrice(value) {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getProductPayload() {
  const data = new FormData(productForm);

  return {
    id: data.get("id"),
    nombre: String(data.get("nombre") || "").trim(),
    descripcion: String(data.get("descripcion") || "").trim(),
    precio: Number(data.get("precio")),
    stock: Number(data.get("stock")),
  };
}

function getOrderPayload() {
  const data = new FormData(orderForm);

  return {
    producto_id: Number(data.get("producto_id")),
    cliente: String(data.get("cliente") || "").trim(),
    email: String(data.get("email") || "").trim(),
    cantidad: Number(data.get("cantidad")),
    fecha_retiro: String(data.get("fecha_retiro") || "").trim(),
    estado: String(data.get("estado") || "pendiente").trim().toLowerCase(),
  };
}

function renderProducts(products) {
  productsList.innerHTML = "";

  if (!products.length) {
    productsState.hidden = false;
    productsState.textContent = "Todavia no hay productos cargados.";
    fillProductOptions([]);
    return;
  }

  productsState.hidden = true;
  fillProductOptions(products);

  products.forEach((product) => {
    const item = document.createElement("li");
    item.className = "item-card";

    item.innerHTML = `
      <div class="item-card__header">
        <div>
          <h3>${product.nombre}</h3>
          <p class="item-card__subtitle">${formatPrice(product.precio)}</p>
        </div>
        <span class="badge badge--stock">Stock: ${product.stock}</span>
      </div>
      <p class="item-card__body">${product.descripcion || "Sin descripcion."}</p>
      <div class="card-actions">
        <button type="button" class="button-secondary" data-action="edit-product" data-id="${product.id}">Editar</button>
        <button type="button" class="button-danger" data-action="delete-product" data-id="${product.id}">Borrar</button>
      </div>
    `;

    productsList.appendChild(item);
  });
}

function createStateSelect(order) {
  const select = document.createElement("select");
  select.className = "inline-select";
  select.dataset.action = "change-order-state";
  select.dataset.id = order.id;
  select.disabled = ["cancelado", "entregado"].includes(order.estado) || !order.producto_id;

  ORDER_STATES.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state.charAt(0).toUpperCase() + state.slice(1);
    option.selected = order.estado === state;
    select.appendChild(option);
  });

  return select;
}

function renderOrders(orders) {
  ordersList.innerHTML = "";

  if (!orders.length) {
    ordersState.hidden = false;
    ordersState.textContent = "Todavia no hay pedidos guardados.";
    return;
  }

  ordersState.hidden = true;

  orders.forEach((order) => {
    const item = document.createElement("li");
    item.className = `item-card ${getOrderStateClass(order.estado)}`;

    const stateWrap = document.createElement("div");
    stateWrap.className = "card-inline-group";
    const stateLabel = document.createElement("span");
    stateLabel.className = "mini-label";
    stateLabel.textContent = "Estado";
    stateWrap.append(stateLabel, createStateSelect(order));

    item.innerHTML = `
      <div class="item-card__header">
        <div>
          <h3>${order.producto || "Producto eliminado"}</h3>
          <p class="item-card__subtitle">${order.cliente} | ${order.email}</p>
        </div>
        <span class="badge ${getOrderStateClass(order.estado)}">${order.estado || "pendiente"}</span>
      </div>
      <div class="item-card__meta">
        <p><strong>Cantidad:</strong> ${order.cantidad}</p>
        <p><strong>Retiro:</strong> ${order.fecha_retiro}</p>
      </div>
    `;

    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.appendChild(stateWrap);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "button-danger";
    cancelButton.dataset.action = "cancel-order";
    cancelButton.dataset.id = order.id;
    cancelButton.textContent = "Cancelar pedido";
    cancelButton.disabled = ["cancelado", "entregado"].includes(order.estado);
    actions.appendChild(cancelButton);

    if (["cancelado", "entregado"].includes(order.estado)) {
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "button-secondary";
      deleteButton.dataset.action = "delete-order";
      deleteButton.dataset.id = order.id;
      deleteButton.textContent = "Borrar pedido";
      actions.appendChild(deleteButton);
    }

    item.appendChild(actions);
    ordersList.appendChild(item);
  });
}

async function loadProducts() {
  productsState.hidden = false;
  productsState.textContent = "Cargando productos...";

  try {
    const response = await fetch(`${API_BASE_URL}/productos`);

    if (!response.ok) {
      throw new Error("No se pudo leer la lista de productos.");
    }

    const products = await response.json();
    productsCache = Array.isArray(products) ? products : [];
    renderProducts(productsCache);
  } catch (error) {
    productsList.innerHTML = "";
    productsState.hidden = false;
    productsState.textContent = "No se pudo conectar con el servidor para leer productos.";
  }
}

async function loadOrders() {
  ordersState.hidden = false;
  ordersState.textContent = "Cargando pedidos...";

  try {
    const response = await fetch(`${API_BASE_URL}/pedidos`);

    if (!response.ok) {
      throw new Error("No se pudo leer la lista de pedidos.");
    }

    const orders = await response.json();
    ordersCache = Array.isArray(orders) ? orders : [];
    renderOrders(ordersCache);
  } catch (error) {
    ordersList.innerHTML = "";
    ordersState.hidden = false;
    ordersState.textContent = "No se pudo conectar con el servidor para leer pedidos.";
  }
}

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = getProductPayload();

  if (!payload.nombre) {
    setMessage(productMessage, "Escribe el nombre del producto.", "error");
    return;
  }

  if (payload.precio < 0 || payload.stock < 0) {
    setMessage(productMessage, "Precio y stock deben ser 0 o mayores.", "error");
    return;
  }

  const isEditing = Boolean(payload.id);
  const submitButton = productForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setMessage(productMessage, isEditing ? "Actualizando producto..." : "Guardando producto...");

  try {
    const response = await fetch(
      isEditing ? `${API_BASE_URL}/productos/${payload.id}` : `${API_BASE_URL}/productos`,
      {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: payload.nombre,
          descripcion: payload.descripcion,
          precio: payload.precio,
          stock: payload.stock,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("No se pudo guardar el producto.");
    }

    resetProductForm();
    setMessage(productMessage, isEditing ? "Producto actualizado." : "Producto guardado.", "success");
    await loadProducts();
  } catch (error) {
    setMessage(productMessage, "No se pudo guardar el producto.", "error");
  } finally {
    submitButton.disabled = false;
  }
});

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = getOrderPayload();

  if (!payload.cliente || !payload.email || !payload.fecha_retiro) {
    setMessage(orderMessage, "Completa todos los campos del pedido.", "error");
    return;
  }

  if (!Number.isInteger(payload.producto_id) || payload.producto_id < 1) {
    setMessage(orderMessage, "Selecciona un producto del catalogo.", "error");
    return;
  }

  if (payload.cantidad < 1) {
    setMessage(orderMessage, "La cantidad debe ser 1 o mayor.", "error");
    return;
  }

  const submitButton = orderForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setMessage(orderMessage, "Guardando pedido...");

  try {
    const response = await fetch(`${API_BASE_URL}/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("No se pudo guardar el pedido.");
    }

    orderForm.reset();
    orderProductSelect.value = "";
    orderForm.querySelector('input[name="cantidad"]').value = 1;
    setMessage(orderMessage, "Pedido guardado correctamente.", "success");
    await loadOrders();
  } catch (error) {
    setMessage(orderMessage, "No se pudo guardar el pedido.", "error");
  } finally {
    submitButton.disabled = false;
  }
});

productsList.addEventListener("click", async (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const productId = button.dataset.id;
  const action = button.dataset.action;

  if (action === "edit-product") {
    const product = productsCache.find((item) => String(item.id) === productId);

    if (!product) {
      return;
    }

    productForm.elements.id.value = product.id;
    productForm.elements.nombre.value = product.nombre;
    productForm.elements.descripcion.value = product.descripcion || "";
    productForm.elements.precio.value = Number(product.precio) || 0;
    productForm.elements.stock.value = product.stock;
    cancelProductEditButton.hidden = false;
    setMessage(productMessage, "Editando producto seleccionado.");
    switchTab("catalogo");
    return;
  }

  if (action === "delete-product") {
    button.disabled = true;
    setMessage(productMessage, "Eliminando producto...");

    try {
      const response = await fetch(`${API_BASE_URL}/productos/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el producto.");
      }

      setMessage(productMessage, "Producto eliminado.", "success");
      await loadProducts();
    } catch (error) {
      setMessage(productMessage, "No se pudo eliminar el producto.", "error");
      button.disabled = false;
    }
  }
});

ordersList.addEventListener("change", async (event) => {
  const select = event.target.closest('[data-action="change-order-state"]');

  if (!select) {
    return;
  }

  const orderId = select.dataset.id;
  const state = select.value;

  const order = ordersCache.find((item) => String(item.id) === orderId);

  if (!order) {
    setMessage(orderMessage, "No se encontro el pedido para actualizar.", "error");
    await loadOrders();
    return;
  }

  setMessage(orderMessage, "Actualizando estado del pedido...");

  try {
    const updateResponse = await fetch(`${API_BASE_URL}/pedidos/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cliente: order.cliente,
        email: order.email,
        producto_id: order.producto_id,
        cantidad: Number(order.cantidad),
        fecha_retiro: order.fecha_retiro,
        estado: state,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error("No se pudo actualizar el pedido.");
    }

    setMessage(orderMessage, "Estado actualizado.", "success");
    await loadOrders();
  } catch (error) {
    setMessage(orderMessage, "No se pudo actualizar el estado del pedido.", "error");
    await loadOrders();
  }
});

ordersList.addEventListener("click", async (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  if (button.dataset.action === "cancel-order") {
    button.disabled = true;
    setMessage(orderMessage, "Cancelando pedido...");

    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${button.dataset.id}/cancelar`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("No se pudo cancelar el pedido.");
      }

      setMessage(orderMessage, "Pedido cancelado.", "success");
      await loadOrders();
    } catch (error) {
      setMessage(orderMessage, "No se pudo cancelar el pedido.", "error");
      button.disabled = false;
    }
    return;
  }

  if (button.dataset.action === "delete-order") {
    button.disabled = true;
    setMessage(orderMessage, "Borrando pedido...");

    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${button.dataset.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo borrar el pedido.");
      }

      setMessage(orderMessage, "Pedido borrado.", "success");
      await loadOrders();
    } catch (error) {
      setMessage(orderMessage, "No se pudo borrar el pedido.", "error");
      button.disabled = false;
    }
  }
});

cancelProductEditButton.addEventListener("click", () => {
  resetProductForm();
  setMessage(productMessage, "Edicion cancelada.");
});

reloadProductsButton.addEventListener("click", loadProducts);
reloadOrdersButton.addEventListener("click", loadOrders);

tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tabTarget));
});

resetProductForm();
loadProducts();
loadOrders();
