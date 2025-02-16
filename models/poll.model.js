import mongoose from "mongoose";

const optionsSchema = new mongoose.Schema({
  optionText: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionsSchema],
  createdAt: { type: Date, default: Date.now },
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
