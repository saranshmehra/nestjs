import { IsOptional, IsString, IsEmail, IsNumber } from "class-validator";

export class UpdateUserDto {

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsNumber()
	age: number;

	@IsOptional()
	@IsEmail()
	email: string

}
