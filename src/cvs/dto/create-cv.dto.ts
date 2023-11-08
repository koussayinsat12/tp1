import { IsNotEmpty, IsString, Length } from "class-validator";
import ErrorMessages from "src/utils/error.messages";

export class CreateCvDto {
    @IsNotEmpty()
    @IsString({message:ErrorMessages.nameRequired})
    name:string;
    @IsNotEmpty({message:ErrorMessages.firstnameRequired})
    @IsString()
    firstname: string;
    @IsNotEmpty({message:ErrorMessages.ageRequired})
    @IsString()
    age: number;
    @IsNotEmpty({message:ErrorMessages.cinRequired})
    @IsString()
    cin: string;
    @IsString()
    job:string;
    @IsString()
    path:string;
}
