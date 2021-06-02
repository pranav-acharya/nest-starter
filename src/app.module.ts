import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { Videos } from './videos';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [CoursesModule, UsersModule, TypeOrmModule.forRoot(), AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService, Videos],
})
export class AppModule {}
