import { HttpException } from "./http.exception";

export class EmailInUseException extends HttpException {
  constructor() {
    super(400, "That Email is already in use. Try Logging in?");
  }
}
