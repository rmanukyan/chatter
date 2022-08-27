const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  //I would make a message a separate model and store id of a room in a message
  // or/and reference to a message in a room (like in 'participants') 
  //But this is a design question and no need to make these changes, I am just sharing the thoughts I have while going through your code
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
