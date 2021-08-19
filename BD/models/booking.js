const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  restaurant: {
    type: Schema.ObjectId,
    ref: "Restaurant",
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  client: {
    type: String,
    required: [true, "Client is required"],
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
