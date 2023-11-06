import { Injectable, NotFoundException } from '@nestjs/common';
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

    async addTodo(createTodoDto:CreateTodoDto): Promise<TodoEntity> {
      const name=createTodoDto.name
      const description=createTodoDto.description
      const status=createTodoDto.status
      const newTodo = this.todoRepository.create({ name,description,status });
      return this.todoRepository.save(newTodo);
    }
    
    async updateTodo(id,updateTodo:Partial<UpdateTodoDto>): Promise<TodoEntity> {
      const findOneOptions: FindOneOptions = {
        where: { id: id }, 
      }
      const existingTodo = await this.todoRepository.findOne(findOneOptions);
      if (!existingTodo) {
        throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
      }
  
      const updatedTodo = Object.assign(existingTodo,updateTodo);
      return this.todoRepository.save(updatedTodo);
}
async deleteTodo(id: number): Promise<DeleteResult> {
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









