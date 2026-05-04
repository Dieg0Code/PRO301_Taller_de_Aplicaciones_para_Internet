import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const ORDER_STATES = ["pendiente", "confirmado", "listo para retiro", "entregado", "cancelado"];

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan SUPABASE_URL o SUPABASE_KEY en el archivo .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());
app.use(express.static("."));

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOrderPayload(body) {
  return {
    producto_id: body.producto_id === "" || body.producto_id === null || body.producto_id === undefined
      ? null
      : Number(body.producto_id),
    cliente: normalizeText(body.cliente),
    email: normalizeText(body.email),
    producto: normalizeText(body.producto),
    cantidad: Number(body.cantidad),
    fecha_retiro: normalizeText(body.fecha_retiro),
    estado: normalizeText(body.estado || "pendiente").toLowerCase(),
  };
}

function normalizeProductPayload(body) {
  return {
    nombre: normalizeText(body.nombre),
    descripcion: normalizeText(body.descripcion),
    precio: Number(body.precio),
    stock: Number(body.stock),
  };
}

function validateOrder(payload) {
  if (!payload.cliente || !payload.email || !payload.fecha_retiro) {
    return "Faltan datos obligatorios del pedido.";
  }

  if (!Number.isInteger(payload.producto_id) || payload.producto_id < 1) {
    return "Debes seleccionar un producto valido.";
  }

  if (!Number.isInteger(payload.cantidad) || payload.cantidad < 1) {
    return "La cantidad debe ser un numero mayor a 0.";
  }

  if (!ORDER_STATES.includes(payload.estado)) {
    return "El estado del pedido no es valido.";
  }

  return null;
}

function validateProduct(payload) {
  if (!payload.nombre) {
    return "El nombre del producto es obligatorio.";
  }

  if (Number.isNaN(payload.precio) || payload.precio < 0) {
    return "El precio debe ser 0 o mayor.";
  }

  if (!Number.isInteger(payload.stock) || payload.stock < 0) {
    return "El stock debe ser un numero entero 0 o mayor.";
  }

  return null;
}

app.get("/productos", async (_request, response) => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return response.status(500).json({ error: "No se pudieron leer los productos." });
  }

  return response.json(data);
});

app.post("/productos", async (request, response) => {
  const payload = normalizeProductPayload(request.body);
  const validationError = validateProduct(payload);

  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  const { data, error } = await supabase
    .from("productos")
    .insert([payload])
    .select()
    .single();

  if (error) {
    return response.status(500).json({ error: "No se pudo guardar el producto." });
  }

  return response.status(201).json(data);
});

app.patch("/productos/:id", async (request, response) => {
  const productId = Number(request.params.id);
  const payload = normalizeProductPayload(request.body);
  const validationError = validateProduct(payload);

  if (!Number.isInteger(productId) || productId < 1) {
    return response.status(400).json({ error: "Id de producto invalido." });
  }

  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  const { data, error } = await supabase
    .from("productos")
    .update(payload)
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    return response.status(500).json({ error: "No se pudo actualizar el producto." });
  }

  return response.json(data);
});

app.delete("/productos/:id", async (request, response) => {
  const productId = Number(request.params.id);

  if (!Number.isInteger(productId) || productId < 1) {
    return response.status(400).json({ error: "Id de producto invalido." });
  }

  const { data: product, error: productLookupError } = await supabase
    .from("productos")
    .select("id, nombre")
    .eq("id", productId)
    .single();

  if (productLookupError || !product) {
    return response.status(404).json({ error: "Producto no encontrado." });
  }

  const { error: orderUpdateError } = await supabase
    .from("pedidos")
    .update({
      producto_id: null,
      producto: "Producto eliminado",
      estado: "cancelado",
    })
    .eq("producto_id", product.id);

  if (orderUpdateError) {
    return response.status(500).json({ error: "No se pudieron actualizar los pedidos del producto." });
  }

  const { error } = await supabase.from("productos").delete().eq("id", productId);

  if (error) {
    return response.status(500).json({ error: "No se pudo eliminar el producto." });
  }

  return response.status(204).send();
});

app.get("/pedidos", async (_request, response) => {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return response.status(500).json({ error: "No se pudieron leer los pedidos." });
  }

  return response.json(data);
});

app.post("/pedidos", async (request, response) => {
  const payload = normalizeOrderPayload(request.body);
  const validationError = validateOrder(payload);

  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  const { data: product, error: productError } = await supabase
    .from("productos")
    .select("id, nombre")
    .eq("id", payload.producto_id)
    .single();

  if (productError || !product) {
    console.error("Error buscando producto para pedido:", productError);
    return response.status(400).json({ error: "El producto seleccionado no existe." });
  }

  const { data, error } = await supabase
    .from("pedidos")
    .insert([{
      ...payload,
      producto: product.nombre,
    }])
    .select()
    .single();

  if (error) {
    console.error("Error guardando pedido:", error);
    return response.status(500).json({ error: "No se pudo guardar el pedido." });
  }

  return response.status(201).json(data);
});

app.patch("/pedidos/:id", async (request, response) => {
  const orderId = Number(request.params.id);
  const payload = normalizeOrderPayload(request.body);
  const validationError = validateOrder(payload);

  if (!Number.isInteger(orderId) || orderId < 1) {
    return response.status(400).json({ error: "Id de pedido invalido." });
  }

  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  const { data: currentOrder, error: currentOrderError } = await supabase
    .from("pedidos")
    .select("id, estado")
    .eq("id", orderId)
    .single();

  if (currentOrderError || !currentOrder) {
    return response.status(404).json({ error: "Pedido no encontrado." });
  }

  if (currentOrder.estado === "entregado" && payload.estado !== "entregado") {
    return response.status(400).json({ error: "Un pedido entregado no puede volver a otro estado." });
  }

  const { data: product, error: productError } = await supabase
    .from("productos")
    .select("id, nombre")
    .eq("id", payload.producto_id)
    .single();

  if (productError || !product) {
    console.error("Error buscando producto al actualizar pedido:", productError);
    return response.status(400).json({ error: "El producto seleccionado no existe." });
  }

  const { data, error } = await supabase
    .from("pedidos")
    .update({
      ...payload,
      producto: product.nombre,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error actualizando pedido:", error);
    return response.status(500).json({ error: "No se pudo actualizar el pedido." });
  }

  return response.json(data);
});

app.post("/pedidos/:id/cancelar", async (request, response) => {
  const orderId = Number(request.params.id);

  if (!Number.isInteger(orderId) || orderId < 1) {
    return response.status(400).json({ error: "Id de pedido invalido." });
  }

  const { data: currentOrder, error: currentOrderError } = await supabase
    .from("pedidos")
    .select("id, estado")
    .eq("id", orderId)
    .single();

  if (currentOrderError || !currentOrder) {
    return response.status(404).json({ error: "Pedido no encontrado." });
  }

  if (currentOrder.estado === "entregado") {
    return response.status(400).json({ error: "Un pedido entregado no puede cancelarse." });
  }

  const { data, error } = await supabase
    .from("pedidos")
    .update({ estado: "cancelado" })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    return response.status(500).json({ error: "No se pudo cancelar el pedido." });
  }

  return response.json(data);
});

app.delete("/pedidos/:id", async (request, response) => {
  const orderId = Number(request.params.id);

  if (!Number.isInteger(orderId) || orderId < 1) {
    return response.status(400).json({ error: "Id de pedido invalido." });
  }

  const { data: order, error: orderLookupError } = await supabase
    .from("pedidos")
    .select("id, estado")
    .eq("id", orderId)
    .single();

  if (orderLookupError || !order) {
    return response.status(404).json({ error: "Pedido no encontrado." });
  }

  if (!["cancelado", "entregado"].includes(order.estado)) {
    return response.status(400).json({ error: "Solo se pueden borrar pedidos cancelados o entregados." });
  }

  const { error } = await supabase.from("pedidos").delete().eq("id", orderId);

  if (error) {
    return response.status(500).json({ error: "No se pudo borrar el pedido." });
  }

  return response.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}`);
});
