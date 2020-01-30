import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  public fullName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public westlandsAccountName: string;

  @IsString()
  public westlandsAccountNumber: string;
}