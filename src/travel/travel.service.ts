import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TravelService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.travelRequest.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.travelRequest.findUnique({ where: { id } });
  }

  create(dto: any) {
    return this.prisma.travelRequest.create({ data: dto });
  }

  update(id: string, dto: any) {
    return this.prisma.travelRequest.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.travelRequest.delete({ where: { id } });
  }
}
