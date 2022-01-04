const express = require("express");
const router = express.Router();

//const todoRouter = require("./todo.routes");
const pollRouter = require("./poll.route");

// Index route
router.get("/", (req, res) => {
  res.send("Hello world!");
});

// API routes
router.use("/polls", pollRouter);

module.exports = router;
