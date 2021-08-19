"use strict";
const Booking = require("../models/booking");
const _ = require("underscore");

const new_Booking = async (req, res) => {
  try {
    const data = _.pick(req.body, "client", "date");
    data.date = data.date.split("T")[0];
    data.restaurant = req.query.id;
    const newBooking = new Booking(data);
    await newBooking.save();
    return res.status(200).send({ data: newBooking });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const all_Bookings = async (req, res) => {
  try {
    const getBookings = await Booking.find({}).populate("restaurant");
    return res.status(200).send({ data: getBookings });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  new_Booking,
  all_Bookings,
};
