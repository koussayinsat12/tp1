import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsString } from 'class-validator';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @IsString()
    designation: string;
}
