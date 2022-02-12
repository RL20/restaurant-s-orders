const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const { getOrders, getOrder, addOrder, updateOrder, removeOrder, getNewOrders, getDoneOrders, updateOrderStatus } = require("../controllers/orderController");

router.get("/orders", getOrders);
router.get("/orders/new", getNewOrders);
router.get("/orders/done", getDoneOrders);
router.get("/orders/:id/", getOrder);
router.post("/orders", addOrder);
router.put("/orders/done/:id", updateOrderStatus);
router.put("/orders/:id/", updateOrder);
router.delete("/orders/:id/", removeOrder);

module.exports = router;
