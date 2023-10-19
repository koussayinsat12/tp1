import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm/repository/Repository';
import StatusEnum from './entities/status.enum';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { DeleteResult, UpdateResult } from 'typeorm';

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
}






