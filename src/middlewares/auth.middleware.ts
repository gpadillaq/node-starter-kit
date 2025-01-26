import { Request, Response, NextFunction } from "express";

import { buildLogger } from "../config";
import { getUserById } from "../models/user.model";
import { jwtAdapter } from "../config";

const logger = buildLogger("auth.middleware");

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("Authorization");
  if (!authorization) return res.status(401).json("Access denied");

  if (!authorization.startsWith("Bearer"))
    return res.status(401).json("Invalid Bearer token");

  const token = authorization.split(" ").at(-1) || "";

  try {
    const decoded = await jwtAdapter.verifyToken<{ id: number }>(token);

    if (!decoded) return res.status(401).json("Invalid token");

    const user = await getUserById(decoded.id);

    if (!user) return res.status(401).json("User not found");

    if (!user.verified)
      return res.status(401).json("This user is not verified");
    if (!user.active) return res.status(401).json("This user is not active");

    req.body.user = user;

    next();
  } catch (error) {
    logger.error(error);
    return res.status(500).json("Internal server error");
  }
};
