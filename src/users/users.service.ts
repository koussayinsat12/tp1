import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CrudService } from 'src/common/crud.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as faker from 'faker';
@Injectable()
export class UsersService extends CrudService<UserEntity, CreateUserDto,UpdateUserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
  async seedDataUser(){
  const usersData = Array(10) // Create 10 users
  .fill(null)
  .map(() => {
    const user = new UserEntity();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return this.userRepository.save(user);
  });
}
}
