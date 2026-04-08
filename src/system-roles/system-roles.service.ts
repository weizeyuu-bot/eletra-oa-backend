import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateSystemRoleDto, UpdateSystemRoleDto } from './dto/system-role.dto';

@Injectable()
export class SystemRolesService {
  constructor(private prisma: PrismaService) {}

  private readonly protectedRoleKeys = new Set(['sys:admin', 'super:admin']);

  private normalizeName(name?: string) {
    return name?.trim();
  }

  private normalizeKey(key?: string) {
    return key?.trim().toLowerCase();
  }

  private async ensureRoleExists(id: number) {
    const role = await this.prisma.systemRole.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }
    return role;
  }

  async create(dto: CreateSystemRoleDto) {
    const name = this.normalizeName(dto.name)!;
    const key = this.normalizeKey(dto.key)!;

    const duplicated = await this.prisma.systemRole.findFirst({
      where: {
        OR: [{ key }, { name }],
      },
    });

    if (duplicated) {
      if (duplicated.key === key) {
        throw new ConflictException('权限字符已存在，请更换后重试');
      }
      throw new ConflictException('角色名称已存在，请更换后重试');
    }

    return this.prisma.systemRole.create({
      data: {
        name,
        key,
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
    const existing = await this.ensureRoleExists(id);

    const data: UpdateSystemRoleDto = { ...dto };

    if (typeof dto.name === 'string') {
      data.name = this.normalizeName(dto.name);
    }
    if (typeof dto.key === 'string') {
      data.key = this.normalizeKey(dto.key);
    }

    if (this.protectedRoleKeys.has(existing.key)) {
      if (typeof data.key === 'string' && data.key !== existing.key) {
        throw new ForbiddenException('内置管理员角色不允许修改权限字符');
      }
      if (typeof data.status === 'boolean' && data.status === false) {
        throw new ForbiddenException('内置管理员角色不允许被停用');
      }
    }

    if (data.key || data.name) {
      const duplicated = await this.prisma.systemRole.findFirst({
        where: {
          id: { not: id },
          OR: [
            ...(data.key ? [{ key: data.key }] : []),
            ...(data.name ? [{ name: data.name }] : []),
          ],
        },
      });

      if (duplicated) {
        if (data.key && duplicated.key === data.key) {
          throw new ConflictException('权限字符已存在，请更换后重试');
        }
        throw new ConflictException('角色名称已存在，请更换后重试');
      }
    }

    return this.prisma.systemRole.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existing = await this.ensureRoleExists(id);

    if (this.protectedRoleKeys.has(existing.key)) {
      throw new ForbiddenException('内置管理员角色不允许删除');
    }

    return this.prisma.systemRole.delete({
      where: { id },
    });
  }

  async getRoleMenuIds(id: number) {
    await this.ensureRoleExists(id);

    const rows = await this.prisma.systemRoleMenu.findMany({
      where: { roleId: id },
      select: { menuId: true },
      orderBy: { menuId: 'asc' },
    });

    return rows.map((row) => row.menuId);
  }

  async setRoleMenuIds(id: number, menuIds: number[]) {
    await this.ensureRoleExists(id);

    const normalizedMenuIds = Array.from(new Set(menuIds || [])).filter((v) => Number.isInteger(v) && v > 0);

    if (normalizedMenuIds.length > 0) {
      const existingMenus = await this.prisma.systemMenu.findMany({
        where: { id: { in: normalizedMenuIds } },
        select: { id: true },
      });
      if (existingMenus.length !== normalizedMenuIds.length) {
        throw new NotFoundException('存在无效菜单，请刷新后重试');
      }
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.systemRoleMenu.deleteMany({ where: { roleId: id } });

      if (normalizedMenuIds.length > 0) {
        await tx.systemRoleMenu.createMany({
          data: normalizedMenuIds.map((menuId) => ({ roleId: id, menuId })),
          skipDuplicates: true,
        });
      }
    });

    return { roleId: id, menuIds: normalizedMenuIds };
  }
}
