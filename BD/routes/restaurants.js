"use strict";

const express = require("express");

// Llamamos al router
const api = express.Router();

// Cargamos el controlador
const controller = require("../controllers/restaurants");

const validations = require("../middleware/validation");

//endpoint
api.post("/", controller.new_Restaurant);

api.get("/", controller.all_restaurants);

api.patch("/", validations.validationRestaurant, controller.edit_restaurants);

api.delete(
  "/",
  validations.validationRestaurant,
  controller.delete_restaurants
);

module.exports = api;
