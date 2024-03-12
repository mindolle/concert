import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto) {
    const existingUser = await this.findByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(signupDto.password, 10);
    if (signupDto.role) {
      await this.userRepository.save({
        email: signupDto.email,
        password: hashedPassword,
        name: signupDto.name,
        role: signupDto.role,
      });
    } else {
      await this.userRepository.save({
        email: signupDto.email,
        password: hashedPassword,
        name: signupDto.name,
      });
    }

    const findName = await this.findByName(signupDto.name);
    if (_.isNil(findName)) {
      throw new UnauthorizedException('이름을 입력해주세요.');
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['userId', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByName(name: string) {
    return await this.userRepository.findOneBy({ name });
  }
}
