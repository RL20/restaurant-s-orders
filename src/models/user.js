const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// {"userId":1,"name":"Harel","cash":10000,"credit":2000}
//!upgrade to user schema to allowed autentication
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "tokensecretword");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};
// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    // first parm is the name of the event  and second is a function
    // need to make sure use regular function because of the binding
    user.password = await bcrypt.hash(user.password, 8);
    console.log("before");
  }
  next(); //have to rememeber call next atherwize the function we run forever
});
const User = mongoose.model("User", userSchema);

module.exports = User;
