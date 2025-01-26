import { Response } from "express";

import { CustomError } from "./custom.error";
import { buildLogger } from "../../config";

const logger = buildLogger("handler.error");

export const handleErrors = (error: any, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  logger.error(error);
  return res.status(500).json("Internal server error");
};
