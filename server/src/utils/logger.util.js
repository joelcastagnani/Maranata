import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" })
  ]
});

const loggerUtil = {
  INFO: (message) => logger.info(message),
  WARN: (message) => logger.warn(message),
  ERROR: (message) => logger.error(message)
};

export default loggerUtil;
