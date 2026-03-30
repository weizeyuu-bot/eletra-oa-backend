import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.auditLog.findUnique({ where: { id } });
  }

  create(dto: any) {
    return this.prisma.auditLog.create({ data: dto });
  }

  remove(id: string) {
    return this.prisma.auditLog.delete({ where: { id } });
  }
}
