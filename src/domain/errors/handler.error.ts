import { Response } from "express";

import { CustomError } from "./custom.error";

export const handleErrors = (error: any, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  console.error(error);
  return res.status(500).json("Internal server error");
};
