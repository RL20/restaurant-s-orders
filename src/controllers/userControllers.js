const User = require("../models/user");
//user login
const login = async (req, res) => {
  console.log("entered login");
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
    // res.send({ data: { user, token } });
  } catch (e) {
    res.status(400).send(e);
  }
};
//user logout
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
};
//user logout from all devices
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
//user enter to there own profile
const myProfile = async (req, res) => {
  res.send(req.user);
};
//signup
const signup = async (req, res) => {
  // const user = await new User(req.body);
  const user = new User(req.body);
  try {
    // console.log(user);
    await user.save();
    const token = await user.generateAuthToken();
    console.log("token", token);
    console.log("user", user);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
    // res.status(400).send({ message: error });
  }
};
//user update there own profile
const updateMyProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};
//user remove there own profile
const deleteMyProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};
//get user by token
const getUserByToken = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, "tokensecretword");
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
};
module.exports = {
  login,
  logout,
  logoutAll,
  signup,
  myProfile,
  updateMyProfile,
  deleteMyProfile,
  getUserByToken,
};
