import { Router } from "express";

import {
  getBookingDetails,
  cancelBookingController,
  getBookingHelperController,
  submitBookingReview,
} from "./booking.controller.js";

const router = Router();

router.get("/:id", getBookingDetails);

router.patch("/:id/cancel", cancelBookingController);

router.get("/:id/helper", getBookingHelperController);

router.post("/:id/review", submitBookingReview);

export default router;