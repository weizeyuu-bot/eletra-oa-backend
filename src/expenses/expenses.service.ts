import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExpenseDto, userId: string) {
    return this.prisma.expense.create({
      data: {
        ...dto,
        submittedBy: userId,
      },
      include: {
        submitter: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany({
      include: {
        submitter: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        approvals: true,
        comments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.expense.findUnique({
      where: { id },
      include: {
        submitter: true,
        approvals: {
          include: {
            approver: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: dto,
      include: {
        submitter: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
