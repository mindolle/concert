import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateConcertDto } from './dto/update-concert.dto';
import { ConcertService } from './concert.service';

@UseGuards(RolesGuard)
@Controller('team')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async findAll() {
    return await this.concertService.findAll();
  }

  @Get(':concertId')
  async findOne(@Param('concertId') concertId: number) {
    return await this.concertService.findOne(concertId);
  }

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    await this.concertService.create(file);
  }

  @Roles(Role.Admin)
  @Put(':concertId')
  async update(
    @Param('concertId') concertId: number,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    await this.concertService.update(concertId, updateConcertDto);
  }

  @Roles(Role.Admin)
  @Delete(':concertId')
  async delete(@Param('concertId') concertId: number) {
    await this.concertService.delete(concertId);
  }
}
