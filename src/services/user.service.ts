import { CustomError } from "../domain";
import { getAllUsers as fetchAllUsers } from "../models/user.model";
import { User } from "../types";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return fetchAllUsers();
  } catch (error: any) {
    throw CustomError.internalServerError(`${error}`);
  }
};
