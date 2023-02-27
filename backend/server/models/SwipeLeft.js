const mongoose = require("mongoose");

// create schema
const schema = new mongoose.Schema({
  email1: { type: String },
  email2: { type: String },
});

const SwipeLeft = mongoose.model("SwipeLeft", schema);
module.exports = SwipeLeft;