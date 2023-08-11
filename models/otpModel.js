const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
  },
});

module.exports = mongoose.model("otps", otpSchema);
