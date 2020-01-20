const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    admin:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
