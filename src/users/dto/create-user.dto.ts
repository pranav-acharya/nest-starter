import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    readonly email: string;
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    readonly firstName: string;

    readonly lastName?: string;
}
