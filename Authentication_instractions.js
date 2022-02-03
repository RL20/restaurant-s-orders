// npm i bcryptjs@2.4.3
const bcrypt = require("bcryptjs");

const myFunction = async () => {
  const password = "Red12345!";
  const hashedPassword = await bcrypt.hash(password, 8);
  // The hashed password is what would be stored in the database
  //first parm is what we what to hash and second is the numbers of rounds we want to perform
  //how many time the hash is executed ,8 is a good number because is a nice balance between security to speed
  console.log("password", password);
  console.log("hashedPassword", hashedPassword);
  const isMatch = await bcrypt.compare("Red12345!", hashedPassword); //check id there is much between password and hashedPassword\
  console.log(isMatch);
};
myFunction();
//!2 mpngoose suport middleware so we are going to customize the user model
//?https://mongoosejs.com/docs/middleware.html#middleware
//2 main places in our app that plain text password are provided -
// creat user and update
//const userSchema = new mongoose.Schema we will creat schema in models/user.js

//!3 we have change the function updateUser in  userController from findByIdAndUpdate to findById so we can use the save middleware

//!4 models/user.js
const bcrypt = require("bcryptjs");

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

//!5 add login router in user router ,add login function in userController ,and add findByCredentials to the models/user.js
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});
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

//!npm i jsonwebtoken@8.4.0
