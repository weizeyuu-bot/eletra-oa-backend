import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.attachment.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.attachment.findUnique({ where: { id } });
  }

  create(dto: any) {
    return this.prisma.attachment.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.attachment.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.attachment.delete({ where: { id } });
  }
}
