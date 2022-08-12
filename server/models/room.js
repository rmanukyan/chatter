const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  messages: [{ body: String, date: Date, userId: String, username: String }],
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
