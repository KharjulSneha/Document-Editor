var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/docify");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
