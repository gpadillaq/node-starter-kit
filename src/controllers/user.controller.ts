import { Request, Response } from "express";

import * as userService from "../services/user.service";
import { handleErrors } from "../domain";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    handleErrors(error, res);
  }
};
