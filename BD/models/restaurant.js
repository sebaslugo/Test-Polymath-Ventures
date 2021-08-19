const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  description: {
    type: String,
  },
  address: { type: String, required: [true, "Address is required"] },
  city: { type: String, required: [true, "City is required"] },
  image: { type: String, required: [true, "Image is required"] },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
