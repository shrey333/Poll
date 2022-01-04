const express = require("express");
const pollModel = require("../model/Poll");

const pollController = {};

/**
 * Show workers by status
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 * @param {express.NextFunction} next - Express router next function
 */
pollController.create = async (req, res, next) => {
  try {
    const poll = await pollModel.insertMany(req.body);
    console.log(poll);
    res.status(200).json(poll[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

pollController.fetchPolls = async (req, res, next) => {
  try {
    const polls = await pollModel.find({}).exec();
    res.status(200).json(polls);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

pollController.fetchPoll = async (req, res, next) => {
  try {
    const poll = await pollModel.findById(req.params._id).exec();
    res.status(200).json(poll);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

pollController.vote = async (req, res, next) => {
  try {
    console.log(req.params._id);
    await pollModel.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).json("Success");
  } catch (err) {
    next(err);
  }
};

// pollController.vote = async (req, res, next) => {
//   try {
//     await pollModel.findByIdAndUpdate(req.params._id, {});
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = { pollController };
