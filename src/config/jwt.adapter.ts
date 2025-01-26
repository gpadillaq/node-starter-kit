import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { envs } from "./envs";

export const jwtAdapter = {
  generateToken: async (payload: any, duration: string | number = "2h") => {
    return new Promise((resolve) => {
      const options: SignOptions = {
        expiresIn: duration as SignOptions["expiresIn"],
      };

      jwt.sign(payload, envs.JWT_SECRET as Secret, options, (error, token) => {
        if (error) {
          return resolve(null);
        }
        resolve(token);
      });
    });
  },
  verifyToken: <T>(token: string): Promise<T | null> => {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET as Secret, (error, decoded) => {
        if (error) {
          return resolve(null);
        }
        resolve(decoded as T);
      });
    });
  },
};
