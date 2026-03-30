import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class NoticeReadService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.noticeRead.findMany({ orderBy: { readAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.noticeRead.findUnique({ where: { id } });
  }

  create(dto: any) {
    return this.prisma.noticeRead.create({ data: dto });
  }

  remove(id: number) {
    return this.prisma.noticeRead.delete({ where: { id } });
  }
}
