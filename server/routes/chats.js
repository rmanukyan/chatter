const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getListOfChats,
  getChatById,
  createNewChat,
  joinChat,
  deleteChat,
} = require("../controllers/chats");

router
  .route("/")
  .get(protect, getListOfChats)
  .post(express.json(), protect, createNewChat);

router
  .route("/:id")
  .get(protect, getChatById)
  .put(express.json(), protect, joinChat)
  .delete(protect, deleteChat);

module.exports = router;
