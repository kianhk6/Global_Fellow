const mongoose = require("mongoose");

// create schema
const schema = new mongoose.Schema({
  firstname: { 
    type: String
  },
  email: { 
    type: String
  },
  password: {
    type: String,
  },
  continent: {
    type: String,
  }, 
  country: {
    type: String,
  },
  interest: {
    type: Array,
    default: [],
  }
});


const User = mongoose.model("User", schema);
module.exports = User;