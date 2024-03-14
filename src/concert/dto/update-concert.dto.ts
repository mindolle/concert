import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateConcertDto {
  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '줄거리를 입력해주세요.' })
  content: string;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsDate()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  date: Date;
}
