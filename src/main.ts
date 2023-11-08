import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo/todo.service';

import * as jwt from 'jsonwebtoken';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /*
  const todoService = app.get(TodoService);
  await todoService.seedData();
  */
  await app.listen(3000);
  function generateToken(userId:number,secretKey:string): string {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); 
    return token;
  }
  /*
const secretKey = '8Xn8@z&A3Bv%vG4#*E$z';
const userId=2;
const token=generateToken(userId,secretKey);
console.log(token);*/
}
bootstrap();
