"use strict";

const express = require("express");

// Llamamos al router
const api = express.Router();

const validations = require("../middleware/validation");

// Cargamos el controlador
const controller = require("../controllers/booking");

/****** End Points ******/
api.post(
  "/",
  validations.validationRestaurant,
  validations.validation_booking,
  controller.new_Booking
);

api.get("/", controller.all_Bookings);

module.exports = api;
