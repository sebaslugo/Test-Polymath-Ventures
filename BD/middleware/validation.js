"use strict";
const Restaurant = require("../models/restaurant");
const Booking = require("../models/booking");

const validationRestaurant = async (req, res, next) => {
  try {
    const { id } = req.query;
    const getRestaurant = await Restaurant.findById(id);

    if (!getRestaurant)
      return res.status(400).send({ message: "Restaurant is not existed" });

    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

const validation_booking = async (req, res, next) => {
  try {
    let { date } = req.body;
    const { id } = req.query;
    date = date.split("T")[0];
    const dayBooking = await Booking.countDocuments({
      date: date,
    });

    if (dayBooking >= 20)
      return res
        .status(400)
        .send({ message: "There are not more reservation for that day" });

    const restaurantBooking = await Booking.countDocuments({
      restaurant: id,
      date: date,
    });

    if (restaurantBooking >= 15) {
      return res.status(400).send({
        message:
          "There are not more reservation for that restaurant in that day",
      });
    }

    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  validationRestaurant,
  validation_booking,
};
