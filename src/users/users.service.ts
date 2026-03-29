import { ConflictException, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email || `${dto.username}@eletra.local`,
          username: dto.username,
          password: hashedPassword,
          nickname: dto.nickname,
          dept: dto.dept,
          phone: dto.phone,
          firstName: dto.firstName,
          lastName: dto.lastName,
          status: dto.status === false ? Status.INACTIVE : Status.ACTIVE,
        },
        select: {
          id: true,
          email: true,
          username: true,
          nickname: true,
          dept: true,
          phone: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException('用户名或邮箱已存在');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        nickname: true,
        dept: true,
        phone: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        nickname: true,
        dept: true,
        phone: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: any = {
      nickname: dto.nickname,
      dept: dto.dept,
      phone: dto.phone,
      firstName: dto.firstName,
      lastName: dto.lastName,
    };

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    if (typeof dto.status === 'boolean') {
      data.status = dto.status ? Status.ACTIVE : Status.INACTIVE;
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        nickname: true,
        dept: true,
        phone: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        username: true,
      },
    });
  }
}
