import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  ready: {
    type: Boolean,
    required: false,
  },
  count: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  transportationType: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  vegetarian: {
    type: Boolean,
    required: false,
  },
  vegetarianCount: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

export default mongoose.model("Guest", courseSchema);
