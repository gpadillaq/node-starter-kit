import prisma from "../db/prisma";

import { PaginationDto } from "../domain";
import { RegisterUserDto } from "../domain/dtos/user/register-user.dto";
import { User } from "../types";

export const getAllUsers = async (
  paginationDto?: PaginationDto
): Promise<User[]> => {
  const pagination = {
    ...(paginationDto && {
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
    }),
  };

  return prisma.user.findMany({
    ...pagination,
    omit: { password: true },
  });
};

export const countUsers = async (): Promise<number> => {
  return prisma.user.count();
};

export const createUser = async <T = User>(
  data: RegisterUserDto
): Promise<T> => {
  return prisma.user.create({ data }) as T;
};

export const getUserByEmail = async <T = User>(
  email: string
): Promise<T | null> => {
  return prisma.user.findFirst({ where: { email } }) as T;
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findFirst({ where: { id } });
};

export const updateUser = async (data: User): Promise<User> => {
  return prisma.user.update({ where: { id: data.id }, data });
};

export const deleteUser = async (id: number): Promise<User> => {
  return prisma.user.delete({ where: { id } });
};
