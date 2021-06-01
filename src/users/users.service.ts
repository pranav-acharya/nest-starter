import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  create(user: CreateUserDto): Promise<User> {
    // this.usersRepository.save();
    const { password } = user;
    user.password = bcrypt.hashSync(password, bcryptConstants.saltOrRounds);
    return this.usersRepository.save(user);
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