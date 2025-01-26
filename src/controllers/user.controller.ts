import { Request, Response } from "express";

import * as userService from "../services/user.service";
import { handleErrors } from "../domain";
import { PaginationDto } from "../domain";

export const getAllUsers = async (req: Request, res: Response) => {
  const {
    page = PaginationDto.FIRST_PAGE,
    limit = PaginationDto.DEFAULT_LIMIT,
  } = req.query;
  const [error, paginationDto] = PaginationDto.create(+page, +limit);

  if (error) return res.status(400).json({ error });

  try {
    const users = await userService.getAllUsers(paginationDto);
    res.json(users);
  } catch (error: any) {
    handleErrors(error, res);
  }
};
