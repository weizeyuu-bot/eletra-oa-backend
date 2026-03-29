import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateSystemRoleDto, UpdateSystemRoleDto } from './dto/system-role.dto';

@Injectable()
export class SystemRolesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSystemRoleDto) {
    return this.prisma.systemRole.create({
      data: {
        name: dto.name,
        key: dto.key,
        sort: dto.sort ?? 0,
        status: dto.status ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.systemRole.findMany({
      orderBy: [{ sort: 'asc' }, { id: 'asc' }],
    });
  }

  async update(id: number, dto: UpdateSystemRoleDto) {
    return this.prisma.systemRole.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.systemRole.delete({
      where: { id },
    });
  }
}
