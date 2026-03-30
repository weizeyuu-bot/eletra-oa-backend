import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.reportSummary.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.reportSummary.findUnique({ where: { id } });
  }

  create(dto: any) {
    return this.prisma.reportSummary.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.reportSummary.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.reportSummary.delete({ where: { id } });
  }
}
