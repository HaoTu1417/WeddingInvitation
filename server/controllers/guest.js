import mongoose from "mongoose";
import Guest from "../models/guest.js";

// create new cause
export function createQuest(req, res) {
  const course = new Guest({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    ready: req.body.ready,
    count: req.body.count,
    transportationType: req.body.transportationType,
    vegetarian: req.body.vegetarian,
    vegetarianCount: req.body.vegetarianCount,
  });
  console.log(course);
  return course
    .save()
    .then((newGuest) => {
      return res.status(201).json({
        success: true,
        message: "New guest created successfully",
        Guest: newGuest,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}
