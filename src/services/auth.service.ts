import { bcryptAdapter, envs, jwtAdapter } from "../config";
import { CustomError, LoginUserDto } from "../domain";
import { EmailService } from "../api/email/email.service";
import { getUserByEmail, createUser, updateUser } from "../models/user.model";
import { RegisterUserDto } from "../domain/dtos/user/register-user.dto";
import { UserWithPassword } from "../types";

export const registerUser = async (registerUserDto: RegisterUserDto) => {
  const existUser = await getUserByEmail(registerUserDto.email);

  if (existUser) {
    throw CustomError.badRequest("User already exists");
  }

  try {
    // encrypt the password
    registerUserDto.password = bcryptAdapter.hash(registerUserDto.password);

    const { password, ...user } = await createUser<UserWithPassword>(
      registerUserDto
    );

    sendVerificationEmail(user.email);

    // generate token
    const token = await jwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomError.internalServerError("Error generating token");

    return {
      user,
      token,
    };
  } catch (error: any) {
    throw CustomError.internalServerError(`${error}`);
  }
};

export const loginUser = async (loginUserDto: LoginUserDto) => {
  const userDB = await getUserByEmail<UserWithPassword>(loginUserDto.email);

  if (!userDB) {
    throw CustomError.badRequest("Invalid email or password");
  }

  const { password, ...user } = userDB;

  const isPasswordValid = bcryptAdapter.compare(
    loginUserDto.password,
    password
  );

  if (!isPasswordValid) {
    throw CustomError.badRequest("Invalid email or password");
  }

  if (!user.verified) throw CustomError.badRequest("Email not verified");

  if (!user.active) throw CustomError.badRequest("User is not active");

  const token = await jwtAdapter.generateToken({ id: user.id });

  if (!token) throw CustomError.internalServerError("Error generating token");

  return {
    user,
    token,
  };
};

export const validateEmail = async (token: string) => {
  const payload = await jwtAdapter.verifyToken(token);

  if (!payload) {
    throw CustomError.badRequest("Invalid token");
  }

  const { email } = payload as { email: string };

  const user = await getUserByEmail(email);

  if (!user) {
    throw CustomError.badRequest("User does not exist, please register again");
  }

  user.verified = true;
  user.active = true;

  await updateUser(user);

  return true;
};

const sendVerificationEmail = async (email: string) => {
  const emailService = new EmailService();
  const token = await jwtAdapter.generateToken({ email });
  if (!token) throw CustomError.internalServerError("Error generating token");

  const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
  const htmlBody = `
    <p>Click on the link to verify your email</p>
    <a href="${link}">Verify email</a>

  `;

  const isSent = await emailService.sendEmail({
    to: email,
    subject: "Email verification",
    htmlBody,
  });

  if (!isSent) throw CustomError.internalServerError("Error sending email");

  return true;
};
