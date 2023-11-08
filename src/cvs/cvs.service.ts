import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CrudService } from 'src/common/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';
import * as faker from 'faker';
@Injectable()
export class CvsService extends CrudService<CvEntity, CreateCvDto,UpdateCvDto> {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {
    super(cvRepository);
  }
  async seedDataCv(){
  const cvData = Array(100) 
  .fill(null)
  .map(() => {
    const cv = new CvEntity();
    cv.name = faker.name.firstName();
    cv.firstname = faker.name.lastName();
    cv.age = faker.datatype.number({ min: 18, max: 60 });
    cv.cin = faker.random.alphaNumeric(8);
    cv.job = faker.name.jobTitle();
    cv.path = faker.internet.url(); 
    return this.cvRepository.save(cv);
  });
}


}
