import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    const user: CreateUserDto = {
      firstName: "Pranav",
      lastName: "Acharya",
      username: "pranav.acharya@test.com",
      email: "pranav.acharya@test.com",
      password: "randomPassword",
    };
    service.create(user);

    const list = await service.findAll();
    expect(list.length).toBe(1);
  })
});
