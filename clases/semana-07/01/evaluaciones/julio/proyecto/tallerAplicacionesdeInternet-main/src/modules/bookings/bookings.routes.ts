import { Router } from "express";

import { BookingsController } from "./bookings.controller.js";
import { BookingsRepository } from "./bookings.repository.js";
import { BookingsService } from "./bookings.service.js";

const bookingsRepository = new BookingsRepository();
const bookingsService = new BookingsService(bookingsRepository);
const bookingsController = new BookingsController(bookingsService);

export const bookingsRouter = Router();

bookingsRouter.get("/availability", bookingsController.getAvailability);
bookingsRouter.post("/", bookingsController.create);
