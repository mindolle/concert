import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../types/userRole.type';
export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: '이메일을 입력해주세요' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  readonly password: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요' })
  readonly name: string;

  @IsEnum(Role)
  @IsOptional()
  readonly role: Role;
}
