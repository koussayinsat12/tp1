import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TryModule } from './try/try.module';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CvsModule } from './cvs/cvs.module';
import { SkillsModule } from './skills/skills.module';
import { UserEntity } from './users/entities/user.entity';
import { SkillEntity } from './skills/entities/skill.entity';
import { CvEntity } from './cvs/entities/cv.entity';

@Module({
  imports: [CommonModule,TryModule, TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp1',
      entities: [TodoEntity,UserEntity,SkillEntity,CvEntity],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    CvsModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
