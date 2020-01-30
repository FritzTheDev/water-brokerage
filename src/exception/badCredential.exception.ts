import { HttpException } from "./http.exception";

export class BadCredentialsException extends HttpException {
  constructor() {
    super(400, "That Email/Password Combination Is Invalid");
  }
}
