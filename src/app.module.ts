import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { Videos } from './videos';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { BullModule } from '@nestjs/bull';

const LOCAL_REDIS_CONFIG = {
  host: 'localhost',
  port: 6379,
};

@Module({
  imports: [
    CoursesModule,
    UsersModule,
    // Pick a single config from ormconfig file
    TypeOrmModule.forRoot(),
    // Redis config for bull module used wherever
    BullModule.forRoot({ redis: LOCAL_REDIS_CONFIG }),
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, Videos],
})
export class AppModule {}
