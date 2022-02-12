const mongoose = require("mongoose");
const validator = require("validator");
const { boolean } = require("yargs");
// {"-Md5ciYzlrM5XE99ikXP":{"orderedItems":[{"amount":2,"id":"m4","name":"Green Bowl","price":18.99}],"user":{"city":"London","name":"Divyam Kakkar","postalCode":"208005","street":"Lajpat Nagar"}}
const orderSchema = new mongoose.Schema({
  // orederNumber: { type: Number, default: 0 },

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
    city: { type: String, required: true },
    street: { type: String, required: true },
    phone: { type: String },
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
