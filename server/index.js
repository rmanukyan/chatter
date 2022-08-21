const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const logger = require("./utils/logger");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const websockets = require("./websockets");
dotenv.config({ path: "./config/config.env" });
const path = require("path");

connectDB();
const chats = require("./routes/chats");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const transfer = require("./routes/transfers");
const app = express();
const port = process.env.PORT;
app.use("/static", express.static(path.join(__dirname, "files")));

// File logger
const rfsStream = rfs.createStream("./logs/http-logger.txt", {
  size: "1M",
  interval: "1d",
  compress: "gzip",
});

app.use(
  morgan("dev", {
    stream: rfsStream,
  })
);

// dev http console logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// enable cors
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/v1/chats", chats);
app.use("/api/v1/auth", auth);
app.use("/api/v1/profile", profile);
app.use("/api/v1/transfer", transfer);
app.use(errorHandler);
app.use(cookieParser());

const server = app.listen(port, () => {
  logger.info(`My super server is running on port ${port}`);
});

websockets(server);
