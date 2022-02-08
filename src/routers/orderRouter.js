const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const { getOrders, getOrder, addOrder, updateOrder, removeOrder } = require("../controllers/orderController");

router.get("/orders", getOrders);
router.get("/orders/:id/", getOrder);
router.post("/orders", addOrder);
router.put("/orders/:id/", updateOrder);
router.delete("/orders/:id/", removeOrder);

module.exports = router;
