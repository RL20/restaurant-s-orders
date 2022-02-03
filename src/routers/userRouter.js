const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const { login, logout, logoutAll, signup, myProfile, updateMyProfile, deleteMyProfile } = require("../controllers/userControllers");

router.post("/users", signup);
router.post("/users/login", login);
router.post("/users/logout", auth, logout);
router.post("/users/logoutAll", auth, logoutAll);
router.get("/users/me", auth, myProfile);
router.patch("/users/me", auth, updateMyProfile);
router.delete("/users/me", auth, deleteMyProfile);

module.exports = router;
