import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from "class-validator";
import ErrorMessages from "src/utils/error.messages";

export class CreateUserDto {
@IsNotEmpty({ message:ErrorMessages.usernameRequired})
@IsString()
username: string;
@IsNotEmpty({message:ErrorMessages.emailRequired})
@IsEmail()
email: string;
@IsNotEmpty({message:ErrorMessages.passwordRequired})
@IsString()
password: string;

 
}
