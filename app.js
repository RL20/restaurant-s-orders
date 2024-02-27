const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");

require("./src/db/mongoose");
const userRouter = require("./src/routers/userRouter");
const mealRouter = require("./src/routers/mealRouter");
const orderRouter = require("./src/routers/orderRouter");

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 9000;
// const publicPath = path.join(__dirname, "client/public");
const publicPath = path.join(__dirname, "client/build");
app.use(express.static(publicPath));
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", mealRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
