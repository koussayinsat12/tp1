
import { NestFactory } from '@nestjs/core/nest-factory';
import { AppModule } from 'src/app.module';
/*
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    console.log(app.get(AppService).getHello())
    const userservice=app.get(UsersService)
    const cvservice=app.get(CvsService)
    const skillservice=app.get(SkillsService)
    await userservice.seedDataUser()
    .then(() => {
      console.log('Seed user data successfully generated and saved.');
    })
    .catch((error) => {
      console.error('Error seeding data:', error);
    });

    await cvservice.seedDataCv()
    .then(() => {
      console.log('Seed cv data successfully generated and saved.');
    })
    .catch((error) => {
      console.error('Error seeding data:', error);
    });
    await skillservice.seedDataSkill()
    .then(() => {
      console.log('Seed skill data successfully generated and saved.');
    })
    .catch((error) => {
      console.error('Error seeding data:', error);
    });
    await app.close();
    }
    bootstrap()*/
async function application() {
        const app = await NestFactory.createApplicationContext(AppModule);
        await app.close();
      }
      application();