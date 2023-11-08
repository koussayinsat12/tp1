import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  exports:[SkillsService],
  imports:[TypeOrmModule.forFeature([SkillEntity])]
})
export class SkillsModule {}
