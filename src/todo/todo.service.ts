import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm/repository/Repository';
import StatusEnum from './entities/status.enum';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { DeleteResult, UpdateResult } from 'typeorm';
const { faker } = require('@faker-js/faker');
@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {}

    async addTodo(createTodoDto:CreateTodoDto,userId:number): Promise<TodoEntity> {
      const name=createTodoDto.name
      const description=createTodoDto.description
      const status=createTodoDto.status
      const createdby=userId
      const newTodo = this.todoRepository.create({ name,createdby,description,status});
      return this.todoRepository.save(newTodo);
    }
    
    async updateTodo(id,updateTodo:Partial<UpdateTodoDto>,userId:number): Promise<TodoEntity> {
      const findOneOptions: FindOneOptions = {
        where: { id: id }, 
      }
      const existingTodo = await this.todoRepository.findOne(findOneOptions);
      if (!existingTodo) {
        throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
      }
      if (existingTodo.createdby!=userId){
        throw new UnauthorizedException(`Accès refusé, User avec l'Id ${userId} est non autorisé à mettre à jour cet todo avec Id ${id}.`)
      }
      const updatedTodo = Object.assign(existingTodo,updateTodo);
      return this.todoRepository.save(updatedTodo);
}
async deleteTodo(id: number,userId:number): Promise<DeleteResult> {
  const findOneOptions: FindOneOptions = {
    where: { id: id }, 
  }
  const existingTodo = await this.todoRepository.findOne(findOneOptions);
  if (!existingTodo) {
    throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
  }
  if (existingTodo.createdby!=userId){
    throw new UnauthorizedException(`Accès refusé, User avec l'Id ${userId} est non autorisé à supprimer cet todo avec Id ${id}.`)
  }
 return await this.todoRepository.delete(id);
}
async softdeleteTodo(id: number): Promise<UpdateResult> {
 return await this.todoRepository.softDelete(id);
}
async restoreTodo(id:number):Promise<UpdateResult>{
  return await this.todoRepository.restore(id)
}
async countTodosByStatus(): Promise<{ [key in StatusEnum]: number }> {
  const counts: { [key in StatusEnum]: number } = {
    [StatusEnum.IN_PROGRESS]: await this.todoRepository.count({ where: { status: StatusEnum.IN_PROGRESS } }),
    [StatusEnum.CANCELED]: await this.todoRepository.count({ where: { status: StatusEnum.CANCELED } }),
    [StatusEnum.PENDING]: await this.todoRepository.count({ where: { status: StatusEnum.PENDING } }),
    [StatusEnum.COMPLETED]: await this.todoRepository.count({ where: { status: StatusEnum.COMPLETED } }),
  
  };
  return counts;
}
async getTodos():Promise<TodoEntity[]>{
  return await this.todoRepository.find();
}
async getTodoById(id: number): Promise<TodoEntity> {
  const findOneOptions: FindOneOptions = {
    where: { id: id }, 
  }
  const todo = await this.todoRepository.findOne(findOneOptions);

  if (!todo) {
    throw new NotFoundException(`Le todo avec l'ID ${id} n'a pas été trouvé.`);
  }

  return todo;
}
async getTodosByCriteria(name?: string, description?: string, status?: StatusEnum,limit?: number,
  offset?: number
): Promise<TodoEntity[]> {
  const query = this.todoRepository.createQueryBuilder('todo');

  if (name) {
    query.andWhere('todo.name LIKE :name', { name: `%${name}%` }); 
  }

  if (description) {
    query.andWhere('todo.description LIKE :description', { description: `%${description}%` }); 
  }

  if (status) {
    query.andWhere('todo.status = :status', { status });
  }
  if (limit) {
    query.limit(limit);
  }

  if (offset) {
    query.offset(offset);
  }

  return await query.getMany();
}

async seedData() {
  const todos = Array(100)
    .fill(null)
    .map(() => {
      const todo = new TodoEntity();
      todo.name = faker.lorem.words(3);
      todo.description = faker.lorem.sentences(3);
      const statusValues = Object.values(StatusEnum);
      const randomIndex = Math.floor(Math.random() * statusValues.length);
      todo.status = statusValues[randomIndex];
      this.todoRepository.save(todo);
    });

}
}









