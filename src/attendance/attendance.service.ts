import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.attendanceRecord.findMany({ orderBy: { date: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.attendanceRecord.findUnique({ where: { id } });
  }

  create(dto: any) {
    return this.prisma.attendanceRecord.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.attendanceRecord.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.attendanceRecord.delete({ where: { id } });
  }
}
