import { Request, Response } from "express";

import * as authService from "../services/auth.service";
import { RegisterUserDto, LoginUserDto, handleErrors } from "../domain";

export const registerUser = async (req: Request, res: Response) => {
  const [error, registerDto] = RegisterUserDto.create(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const user = await authService.registerUser(registerDto!);

    return res.json(user);
  } catch (error: any) {
    handleErrors(error, res);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const [error, loginDto] = LoginUserDto.create(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const user = await authService.loginUser(loginDto!);

    return res.json(user);
  } catch (error: any) {
    handleErrors(error, res);
  }
};

export const validateEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const isValid = await authService.validateEmail(token);

    if (isValid) {
      return res.json("Email validated");
    }

    return res.status(400).json("Invalid token");
  } catch (error: any) {
    handleErrors(error, res);
  }
};
