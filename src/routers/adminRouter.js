const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const { login, logout, logoutAll, getUsers, getUser, addUser, updateUser, removeUser } = require("../controllers/admin");

router.post("/users/login", login);
router.post("/users/logout", auth, adminAuth, logout);
router.post("/users/logoutAll", auth, adminAuth, logoutAll);

router.get("/users", auth, adminAuth, getUsers);
router.get("/users/:id/", auth, adminAuth, getUser);
router.post("/users", auth, adminAuth, addUser);
router.put("/users/:id/", auth, adminAuth, updateUser);
router.delete("/users/:id/", auth, adminAuth, removeUser);
// patch

module.exports = router;
