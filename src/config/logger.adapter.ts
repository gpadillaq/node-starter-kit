import winston from "winston";
import { envs } from "./envs";

const { json, timestamp, combine } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (envs.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const buildLogger = (service: string) => {
  return {
    log: (message: string) => {
      logger.info("info", { service, message });
    },
    error: (error: any) => {
      logger.error("error", { service, error });
    },
  };
};

export { buildLogger };
