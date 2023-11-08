import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCvDto extends PartialType(CreateCvDto) {
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    firstname: string;
    @IsNotEmpty()
    @IsString()
    age: number;
    @IsNotEmpty()
    @IsString()
    cin: string;
    @IsString()
    job:string;
    @IsString()
    path:string;
}

