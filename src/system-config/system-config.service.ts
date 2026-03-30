import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  SaveDeptDto,
  SaveDictDto,
  SaveMenuDto,
  SaveNoticeDto,
  SavePostDto,
} from './dto/system-config.dto';

@Injectable()
export class SystemConfigService {
  constructor(private readonly prisma: PrismaService) {}

  findMenus() {
    return this.prisma.systemMenu.findMany({ orderBy: [{ sort: 'asc' }, { id: 'asc' }] });
  }

  createMenu(dto: SaveMenuDto) {
    return this.prisma.systemMenu.create({ data: { ...dto, status: dto.status ?? true } });
  }

  updateMenu(id: number, dto: Partial<SaveMenuDto>) {
    return this.prisma.systemMenu.update({ where: { id }, data: dto });
  }

  removeMenu(id: number) {
    return this.prisma.systemMenu.delete({ where: { id } });
  }

  findDepts() {
    return this.prisma.systemDept.findMany({ orderBy: [{ sort: 'asc' }, { id: 'asc' }] });
  }

  createDept(dto: SaveDeptDto) {
    return this.prisma.systemDept.create({ data: { ...dto, status: dto.status ?? true } });
  }

  updateDept(id: number, dto: Partial<SaveDeptDto>) {
    return this.prisma.systemDept.update({ where: { id }, data: dto });
  }

  removeDept(id: number) {
    return this.prisma.systemDept.delete({ where: { id } });
  }

  findPosts() {
    return this.prisma.systemPost.findMany({ orderBy: [{ sort: 'asc' }, { id: 'asc' }] });
  }

  createPost(dto: SavePostDto) {
    return this.prisma.systemPost.create({ data: { ...dto, status: dto.status ?? true } });
  }

  updatePost(id: number, dto: Partial<SavePostDto>) {
    return this.prisma.systemPost.update({ where: { id }, data: dto });
  }

  removePost(id: number) {
    return this.prisma.systemPost.delete({ where: { id } });
  }

  findDicts() {
    return this.prisma.systemDict.findMany({ orderBy: [{ id: 'asc' }] });
  }

  createDict(dto: SaveDictDto) {
    return this.prisma.systemDict.create({ data: { ...dto, status: dto.status ?? true } });
  }

  updateDict(id: number, dto: Partial<SaveDictDto>) {
    return this.prisma.systemDict.update({ where: { id }, data: dto });
  }

  removeDict(id: number) {
    return this.prisma.systemDict.delete({ where: { id } });
  }

  findNotices() {
    return this.prisma.systemNotice.findMany({ orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] });
  }

  createNotice(dto: SaveNoticeDto) {
    return this.prisma.systemNotice.create({
      data: {
        ...dto,
        status: dto.status ?? true,
        creator: dto.creator || 'admin',
        isNew: dto.isNew ?? true,
      },
    });
  }

  updateNotice(id: number, dto: Partial<SaveNoticeDto>) {
    return this.prisma.systemNotice.update({ where: { id }, data: dto });
  }

  removeNotice(id: number) {
    return this.prisma.systemNotice.delete({ where: { id } });
  }
}
