import { Router } from "express";

import { adminRouter } from "../modules/admin/admin.routes.js";
import { bookingsRouter } from "../modules/bookings/bookings.routes.js";

export const apiRouter = Router();

// Healthcheck simple para desarrollo, verificacion manual y monitoreo basico.
apiRouter.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// Separa el espacio administrativo del espacio publico de reservas.
apiRouter.use("/admin", adminRouter);
apiRouter.use("/bookings", bookingsRouter);
