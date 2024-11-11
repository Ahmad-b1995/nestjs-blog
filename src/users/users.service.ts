import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['username', 'nickName', 'email', 'desc', 'avatar', 'isActive'],
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: +id } });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.nickName = createUserDto.nickName;
    user.email = createUserDto.email;
    user.desc = createUserDto.desc;
    user.avatar = createUserDto.avatar;

    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { username, nickName, email, desc, avatar } = updateUserDto;
    const user = await this.usersRepository.findOne({ where: { id: +id } });
    this.usersRepository.merge(user, {
      username,
      nickName,
      email,
      desc,
      avatar,
    });
    console.log('user is: ', user);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(loginDto: LoginDto): Promise<User> {
    console.log('loginDto is: ', loginDto);
    const { username, password } = loginDto;
    return this.usersRepository.findOne({
      where: {
        username: username,
        password: password,
      },
    });
  }
}
