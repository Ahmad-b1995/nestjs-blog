import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('api/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.usersService.create(dto);
      return { message: 'User registered successfully', user };
    } catch (error) {
      throw new HttpException(
        'Failed to register user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() dto: LoginDto, @Request() req) {
    try {
      const loginResult = await this.authService.login(req.user);
      return loginResult;
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token required for accessing this endpoint',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getProfile(@Request() req) {
    try {
      const user = await this.authService.findOne(req.user.username);
      return user;
    } catch (error) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
