import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrifileDto } from './dto/profile.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    return await this.userService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.userService.login(
      loginDto.email,
      loginDto.password,
    );
    res.cookie('authorization', `Bearer ${user.access_token}`);
    res.send('로그인에 성공하였습니다.');
  }

  @Get(':userId')
  async getuser(@Body() prifileDto: PrifileDto, @Res() res) {
    const profile = await this.userService.findByEmail(prifileDto.email);
    res.send(profile);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
