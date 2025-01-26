import { regularExps } from "../../../utils/constats";

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    if (!password) return ["missing password"];
    // todo: add more password validation
    if (password.length <= 6)
      return ["Password must be at least 6 characters long"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
