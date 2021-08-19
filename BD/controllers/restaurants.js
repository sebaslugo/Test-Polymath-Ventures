"use strict";
const Restaurant = require("../models/restaurant");
const _ = require("underscore");

const new_Restaurant = async (req, res) => {
  try {
    const data = _.pick(
      req.body,
      "name",
      "address",
      "city",
      "image",
      "description"
    );

    data.name = data.name.toUpperCase();
    const newRestaurant = new Restaurant(data);
    await newRestaurant.save();
    return res.status(200).send({ data: newRestaurant });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const all_restaurants = async (req, res) => {
  try {
    const getRestaurant = await Restaurant.find({}).sort({ name: 1, city: 1 });
    return res.status(200).send({ data: getRestaurant });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const edit_restaurants = async (req, res) => {
  try {
    const { id } = req.query;
    const data = _.pick(req.body, "name", "address", "city", "image");
    const editResult = await Restaurant.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(200).send({ data: editResult });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const delete_restaurants = async (req, res) => {
  try {
    const { id } = req.query;
    await Restaurant.findByIdAndRemove(id);
    return res.status(200).send({ data: "Restaurant has been eliminated" });
  } catch (error) {
    return res.status(400).send(error);
  }
};
module.exports = {
  new_Restaurant,
  all_restaurants,
  edit_restaurants,
  delete_restaurants,
};
