import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    firstName: String;

    @IsString()
    @IsNotEmpty()
    lastName: String;

    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsString()
    @IsNotEmpty()
    address: String;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: String;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    contactNumber: String;
}