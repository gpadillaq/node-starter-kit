import prisma from "../db/prisma";

import { RegisterUserDto } from "../domain/dtos/user/register-user.dto";
import { User } from "../types";

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    omit: { password: true },
  });
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
