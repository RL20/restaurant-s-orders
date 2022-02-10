const express = require("express");
const cors = require("cors");
const path = require("path");
//!ws---------------------------------------------------
const http = require("http");
const socketIo = require("socket.io");
const socketConfig = require("./config/socket.config");

//!-----------------------------------------------------
require("./src/db/mongoose");
const userRouter = require("./src/routers/userRouter");
const mealRouter = require("./src/routers/mealRouter");
const orderRouter = require("./src/routers/orderRouter");
//!ws---------------------------------------------------
const index = require("./src/routers/index");

//!-----------------------------------------------------
const app = express();

app.use(express.json());
app.use(cors());
//!ws---------------------------------------------------
// app.use(index);
//!-----------------------------------------------------
//!ws---------------------------------------------------
const server = http.createServer(app);
// const io = socketIo(server); // < Interesting!
const io = socketIo(server, socketConfig);
let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   socket.on("addOrder", (message) => {
//     console.log("addOrder", message);
//     socket.broadcast.emit("getOrders", order);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });
// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };
//?---------Test----------------------------
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

//?-------------------------------------
//!------------------------------------------------------

//************************************************ */
const port = process.env.PORT || 9000;

const publicPath = path.join(__dirname, "client/build");
app.use(express.static(publicPath));
app.use("/api", userRouter); //user router
app.use("/api", mealRouter); //meal router
app.use("/api", orderRouter); //order router
app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});
server.listen(port, () => console.log(`Listening on port ${port}`));
//!change for ws-------------------
// app.listen(port, () => {
//   console.log("listening on port " + port);
// });
//!-----------------------------------
// const jwt = require("jsonwebtoken");
// const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", { expiresIn: "7 days" });
