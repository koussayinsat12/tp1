import { IsNotEmpty, IsString } from "class-validator";
import ErrorMessages from "src/utils/error.messages";

export class CreateSkillDto {
@IsNotEmpty({message:ErrorMessages.descriptionRequired})
@IsString()
designation: string;
}
