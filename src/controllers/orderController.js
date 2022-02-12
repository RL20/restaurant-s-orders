const Order = require("../models/order");

//get all order
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", ["name"]);
    // console.log("orders", orders);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
    // res.status(500).send({ error: " Internal Server Error" });
  }
};
//get new orders
const getNewOrders = async (req, res) => {
  try {
    const orders = await Order.find({ done: false }).populate("user", ["name"]);
    console.log("new orders", orders);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
    // res.status(500).send({ error: " Internal Server Error" });
  }
};

//get done orders
const getDoneOrders = async (req, res) => {
  try {
    const orders = await Order.find({ done: true }).populate("user", ["name"]);
    // console.log("orders", orders);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
    // res.status(500).send({ error: " Internal Server Error" });
  }
};

//get order by id
const getOrder = async (req, res) => {
  const _id = req.params.id;
  console.log("oid", _id);
  try {
    const order = await Order.findOne({ _id });
    console.log("order from get one", order);
    if (!order) {
      console.log("userinside", order);
      return res.status(404).send(`Order not found`);
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
  }
};

//add order
const addOrder = async (req, res) => {
  // console.log("req.body", req.body);
  const order = new Order(req.body);
  try {
    // console.log(order);
    order.populate("user", ["name"]);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

//update order
const updateOrder = async (req, res) => {
  const updates = Object.keys(req.body);
  console.log("req.body", req.body);

  const allowUpdates = ["orderedItems", "address", "user"];
  const isValidOperation = updates.every((update) => {
    return allowUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateOrder) {
      return res.status(404).send({ error: `no such ${req.params.id} to update` });
    }
    res.status(200).send(updateOrder);
  } catch (error) {
    // res.status(400).send({ message: "Bad Request" });
    res.status(400).send({ error });
  }
};
//update order statuse
const updateOrderStatus = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { done: true },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateOrder) {
      return res.status(404).send({ error: `no such ${req.params.id} to update` });
    }
    res.status(200).send(updateOrder);
  } catch (error) {
    // res.status(400).send({ message: "Bad Request" });
    res.status(400).send({ error });
  }
};

//Remove order
const removeOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findOneAndDelete({ _id: id });
    if (!order) {
      return res.status(404).send({ error: `Order  not found` });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  removeOrder,
  getNewOrders,
  updateOrderStatus,
  getDoneOrders,
};
