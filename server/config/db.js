const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDb = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  logger.info(`MongoDB Connected ${db.connection.host}`);
};

module.exports = connectDb;
