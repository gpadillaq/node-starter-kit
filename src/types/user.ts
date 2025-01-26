import { User as PrismaUser } from "@prisma/client";

export interface User extends Omit<PrismaUser, "password"> {}
export interface UserWithPassword extends PrismaUser {}
