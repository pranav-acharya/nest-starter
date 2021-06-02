import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from 'src/auth/constants';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private notificationService: NotificationService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(user: CreateUserDto): Promise<User> {
    // this.usersRepository.save();
    const { password, email } = user;
    user.username = email;
    user.password = bcrypt.hashSync(password, bcryptConstants.saltOrRounds);
    const createdUser = await this.usersRepository.save(user);
    await this.notificationService.sendRegistrationNotification(createdUser);
    return createdUser;
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOne(options: Partial<User>): Promise<User> {
    return this.usersRepository.findOne(options);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}