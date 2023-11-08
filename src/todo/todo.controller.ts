import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateTodoDto } from './dto/create.todo.dto';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update.todo.dto';
import StatusEnum from './entities/status.enum';
import { TodoEntity } from './entities/todo.entity';

@Controller('todo')
export class TodoController {

constructor(private readonly todoService: TodoService) {}

  @Post('add')
  async addTodo(@Req() req: any,@Body() createTodoDto: CreateTodoDto) {
    const userId = req.userId;
    return this.todoService.addTodo(createTodoDto,userId);
  }
  @Put('update/:id')
  async update(@Req()req,@Param('id') id,@Body() updateTodoDto:Partial<UpdateTodoDto>){
    const userId = req.userId;
    return await this.todoService.updateTodo(id,updateTodoDto,userId);
  }
  @Delete('delete/:id')
  async delete(@Req() req,@Param('id') id){
    const userId=req.userId
  await this.todoService.deleteTodo(id,userId)
  }
  @Get('page')
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
