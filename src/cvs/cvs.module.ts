import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';

@Module({
  controllers: [CvsController],
  providers: [CvsService],
  exports: [CvsService],
  imports:[TypeOrmModule.forFeature([CvEntity])]
})
export class CvsModule {}
