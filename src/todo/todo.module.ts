import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { AuthMiddleware } from 'src/middelwares/auth.middelware';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
  controllers: [TodoController],
  exports:[TodoService]
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'todo/*', method: RequestMethod.POST },
        { path: 'todo/*', method: RequestMethod.PUT }, 
        { path: 'todo/*', method: RequestMethod.DELETE } 


      )
}}
