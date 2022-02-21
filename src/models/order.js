const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  orderedItems: {
    type: Array,
    required: true,
    validate(value) {
      if (value.length < 1) {
        throw new Error("need at least one item");
      }
    },
  },
  address: {
    city: { type: String, required: true, minlength: 2 },
    street: { type: String, required: true, minlength: 2 },
    phone: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "he-IL")) {
          throw new Error(`you must insert a valid Israeli phone number`);
        }
      },
    },
  },
  //referance to user object
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  dateAdded: { type: Date, default: new Date() },
  done: { type: Boolean, default: false },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
