import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Concert } from 'src/user/entities/concert.entity';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  providers: [ConcertService],
  controllers: [ConcertController],
})
export class ConcertModule {}
