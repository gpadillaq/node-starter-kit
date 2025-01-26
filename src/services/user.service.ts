import { CustomError, PaginationDto } from "../domain";
import { getAllUsers as fetchAllUsers, countUsers } from "../models/user.model";

export const getAllUsers = async (paginationDto?: PaginationDto) => {
  try {
    const [total, users] = await Promise.all([
      countUsers(),
      fetchAllUsers(paginationDto),
    ]);

    return {
      limit: paginationDto?.limit,
      page: paginationDto?.page,
      total,
      users,
    };
  } catch (error: any) {
    throw CustomError.internalServerError(`${error}`);
  }
};
