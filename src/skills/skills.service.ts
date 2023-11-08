import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillEntity } from './entities/skill.entity';
import { CrudService } from 'src/common/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
@Injectable()
export class SkillsService extends CrudService<SkillEntity, CreateSkillDto,UpdateSkillDto> {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>,
  ) {
    super(skillRepository);
  }
  async seedDataSkill(){
  const skillsData = Array(10) 
      .fill(null)
      .map(() => {
        const skill = new SkillEntity();
        skill.designation = faker.name.jobType();
        return this.skillRepository.save(skill);
      });
    }  
}
