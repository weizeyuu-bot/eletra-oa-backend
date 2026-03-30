import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NoticeReadService } from './notice-read.service';

@Controller('api/noticereads')
export class NoticeReadController {
  constructor(private readonly svc: NoticeReadService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.svc.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: any) {
    return this.svc.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.svc.remove(Number(id));
  }
}
