const { createLogger, format, transports } = require("winston");
const appRoot = require("app-root-path");
const { combine, timestamp, printf } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  exitOnError: false,
  transports: [
    new transports.File({
      filename: `${appRoot}/logs/my-custom-logs.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = logger;
