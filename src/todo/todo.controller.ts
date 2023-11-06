import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTodoDto } from './dto/create.todo.dto';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update.todo.dto';
import StatusEnum from './entities/status.enum';
import { TodoEntity } from './entities/todo.entity';

@Controller('todo')
export class TodoController {

constructor(private readonly todoService: TodoService) {}

  @Post()
  async addTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.addTodo(createTodoDto);
  }
  @Put(':id')
  async update(@Param('id') id,@Body() updateTodoDto:Partial<UpdateTodoDto>){
    return await this.todoService.updateTodo(id,updateTodoDto);
  }
  @Delete(':id')
  async delete(@Param('id') id){
  await this.todoService.deleteTodo(id)
  }
  @Get('/page')
  async findTodos(
    @Query('name') name?: string, 
    @Query('description') description?: string,
    @Query('status') status?: StatusEnum,
    @Query('limit') limit?: number
  ): Promise<TodoEntity[]> {
    return this.todoService.getTodosByCriteria(name, description, status, limit);
  }

  @Get('status/count')
  async countTodosByStatus(){
    return await this.todoService.countTodosByStatus(); 
  }
  @Get('count')
  async  countTodos(){
    return await this.todoService.getTodos();
  }
  @Get(':id')
  async getTodobyId(@Param('id') id):Promise<TodoEntity>{
    console.log(id)
    return await this.todoService.getTodoById(id)

  }
 

  




}
