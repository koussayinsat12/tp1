import { IsString, IsNotEmpty, Length, IsIn } from 'class-validator';
import { ErrorMessages } from './error.messages';
import StatusEnum from '../entities/status.enum';
export class CreateTodoDto {
  @IsNotEmpty()
  @IsString({message:ErrorMessages.descriptionRequired})
  @Length(10, undefined, { message:ErrorMessages.descriptionLength})
  description: string;

  @IsNotEmpty({ message:ErrorMessages.nameRequired})
  @IsString()
  @Length(3, 10, { message: ErrorMessages.nameLength })
  name: string;
  @IsIn([
  'Pending',
  'InProgress',
  'Completed',
 'Canceled'
  ], { message: ErrorMessages.statusInvalid })
  status: StatusEnum;
}
