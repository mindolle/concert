import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateConcertDto } from './dto/update-concert.dto';
import { Concert } from 'src/user/entities/concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async findAll(): Promise<Concert[]> {
    return await this.concertRepository.find({
      select: ['concertId', 'title', 'content', 'price', 'date'],
    });
  }

  async findOne(id: number) {
    return await this.verifyTeamById(id);
  }

  async create(file: Express.Multer.File) {
    if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('CSV 파일만 업로드 가능합니다.');
    }

    const csvContent = file.buffer.toString();

    let parseResult;
    try {
      parseResult = parse(csvContent, {
        header: true,
        skipEmptyLines: true,
      });
    } catch (error) {
      throw new BadRequestException('CSV 파싱에 실패했습니다.');
    }

    const concertsData = parseResult.data as any[];

    for (const concertData of concertsData) {
      if (_.isNil(concertData.title) || _.isNil(concertData.content)) {
        throw new BadRequestException(
          'CSV 파일은 title과 content 컬럼을 포함해야 합니다.',
        );
      }
    }

    const createConcertDtos = concertsData.map((concertData) => ({
      title: concertData.title,
      content: concertData.content,
    }));

    await this.concertRepository.save(createConcertDtos);
  }

  async update(concertId: number, updateConcertDto: UpdateConcertDto) {
    await this.verifyTeamById(concertId);
    await this.concertRepository.update({ concertId }, updateConcertDto);
  }

  async delete(concertId: number) {
    await this.verifyTeamById(concertId);
    await this.concertRepository.delete({ concertId });
  }

  private async verifyTeamById(concertId: number) {
    const concert = await this.concertRepository.findOneBy({ concertId });
    if (_.isNil(concert)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return concert;
  }
}
