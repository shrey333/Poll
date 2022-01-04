const express = require("express");
const pollRouter = express.Router();
const { pollController } = require("../controller/Poll.controller");

//worker ma error aave 6 so test.controler

pollRouter.get("/fetchPolls", pollController.fetchPolls);
pollRouter.get("/fetchPoll/:_id", pollController.fetchPoll);
pollRouter.post("/create", pollController.create);
pollRouter.post("/vote/:_id", pollController.vote);

// todoRouter.post("/", TodoController.create);
// todoRouter.get("/:id", TodoController.show);
// todoRouter.post("/:id", TodoController.update);
// todoRouter.delete("/:id", TodoController.delete);

module.exports = pollRouter;
