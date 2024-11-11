import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get user list' })
  async findAll() {
    const data = await this.usersService.findAll();
    return { data };
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return { data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user information' })
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return { data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(id, updateUserDto);
    return { data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(id);
    return { data };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto) {
    const data = await this.usersService.login(loginDto);
    console.log('data is: ', data);
    if (!data) {
      return { desc: 'Username or password incorrect' };
    }
    return { data };
  }
}
