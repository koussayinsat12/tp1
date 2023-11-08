import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { HasIdInterface } from './has-id.interface';

export class CrudService<T extends HasIdInterface,CreateDto,UpdateDto> {
  constructor(private repository: Repository<T>) {}

  async create(createDto: CreateDto): Promise<T> {
    const newEntity = this.repository.create(createDto as DeepPartial<T>);
    return await this.repository.save(newEntity);
  }
  findAll() {
    return this.repository.find();
  }

  findOne(id:number) {
    const findOneOptions: FindOneOptions = {
        where: { id: id }, 
      }
    return this.repository.findOne(findOneOptions);
  }

  async update(id: number, updateDto: Partial<UpdateDto>):Promise<T> {
    const findOneOptions: FindOneOptions = {
        where: { id: id }, 
      }
      const existingEntity = await this.repository.findOne(findOneOptions);
      if (!existingEntity) {
        throw new NotFoundException(`L' entitté avec l'ID ${id} n'a pas été trouvé.`);
      }
      const updatedEntity = Object.assign(existingEntity,updateDto);
      return await this.repository.save(updatedEntity);
   }
   async remove(id: number): Promise<DeleteResult> {
    const findOneOptions: FindOneOptions = {
      where: { id: id }, 
    }
    const existingEntity = await this.repository.findOne(findOneOptions);
    if (!existingEntity) {
      throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
    }
   return await this.repository.delete(id);
}
  }

