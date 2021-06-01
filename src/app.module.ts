import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { Videos } from './videos';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoursesModule, UsersModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, Videos],
})
export class AppModule {}
