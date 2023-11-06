import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo/todo.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /*
  const todoService = app.get(TodoService);
  await todoService.seedData();
  */
  await app.listen(3000);
}
bootstrap();
