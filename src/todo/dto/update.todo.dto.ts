import { IsString, Length, IsIn } from 'class-validator';
import { ErrorMessages } from '../../utils/error.messages';
import StatusEnum from '../entities/status.enum';

export class UpdateTodoDto {
  @IsString({ message: ErrorMessages.descriptionRequired })
  @Length(10, undefined, { message: ErrorMessages.descriptionLength })
  description?: string;

  @IsString({ message: ErrorMessages.nameRequired })
  @Length(3, 10, { message: ErrorMessages.nameLength })
  name?: string;
  @IsIn([
    'Pending',
    'In Progress',
    'Completed',
   'Canceled'
    ], { message: ErrorMessages.statusInvalid })
  status?: StatusEnum;
}