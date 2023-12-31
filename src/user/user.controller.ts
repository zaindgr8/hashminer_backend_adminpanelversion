import { Controller, Post, Res, Body, HttpStatus, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  async registerUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.registerUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User Created Successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('/login')
  async login(
    @Res() response,
    @Body() userInfo: { email: string; password: string },
  ) {
    try {
      const jwt = await this.userService.login(userInfo);
      return response.status(HttpStatus.OK).json({
        token: jwt,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Email or Password is Incorrect!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/refral_balabce')
  async refralBal(@Res() response, @Req() req) {
    try {
      const id = req.id;
      const refralBal = await this.userService.getRefralBal(id);

      return response.status(HttpStatus.OK).json({
        userRefralBal: refralBal,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: In getting user refral balance !',
        error: 'Bad Request',
      });
    }
  }
}


