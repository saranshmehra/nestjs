import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

}
