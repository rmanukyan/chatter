const ErrorResponse = require("../utils/errorResponse");
const { ObjectId } = require("mongodb");

// not working ;( Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
const asyncHandler = require("../middleware/async");
const Room = require("../models/room");

exports.getListOfChats = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json({ success: true, data: rooms });
  } catch (err) {
    next(err);
  }
};

exports.getChatById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(
        new ErrorResponse(`Room with id ${req.params.id} not found`, 404)
      );
    }

    res.status(200).json({ success: true, data: room });
  } catch (err) {
    next(err);
  }
};

exports.createNewChat = async (req, res, next) => {
  try {
    const room = {
      name: req.body.name,
      user: req.user.id,
      participants: [ObjectId(req.user.id)],
    };

    const newRoom = await Room.create(room);
    res.status(201).json({ success: true, data: newRoom });
  } catch (err) {
    next(err);
  }
};

exports.joinChat = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(
        new ErrorResponse(`Room with id ${req.params.id} not found`, 404)
      );
    }

    if (!room.participants.includes(req.user.id)) {
      room.participants.push(req.user.id);
      room.save();
    }

    res.status(200).json({ success: true, data: room });
  } catch (err) {
    next(err);
  }
};

exports.updateChatName = async (req, res, next) => {
  try {
    const r = await Room.findById(req.params.id);

    if (r.user._id.toString() !== req.user.id) {
      return next(new ErrorResponse(`You cannot modify this room`, 403));
    }

    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return next(
        new ErrorResponse(`Room with id ${req.params.id} not found`, 404)
      );
    }

    res.status(200).json({ success: true, data: room });
  } catch (err) {
    next(err);
  }
};

exports.deleteChat = async (req, res, next) => {
  try {
    const r = await Room.findById(req.params.id);
    if (r.user._id.toString() !== req.user.id) {
      return next(new ErrorResponse(`You cannot delete this room`, 403));
    }

    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return next(
        new ErrorResponse(`Room with id ${req.params.id} not found`, 404)
      );
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
