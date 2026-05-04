import { Router } from "express";

import { AdminController } from "./admin.controller.js";
import { requireAdminSession } from "./admin.middleware.js";

const adminController = new AdminController();

export const adminRouter = Router();

// Las rutas admin se agrupan porque comparten autenticacion distinta al flujo publico.
adminRouter.post("/login", adminController.login);
adminRouter.post("/logout", adminController.logout);
adminRouter.get("/session", adminController.getSession);
adminRouter.get("/bookings", requireAdminSession, adminController.listBookings);
// El borrado de reservas se protege con sesion admin porque modifica el estado persistido del sistema.
adminRouter.delete("/bookings/:id", requireAdminSession, adminController.deleteBooking);
