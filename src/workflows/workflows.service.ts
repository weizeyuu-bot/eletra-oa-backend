import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateWorkflowDto } from './dto/workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkflowDto, userId: string) {
    return this.prisma.workflow.create({
      data: {
        title: dto.title,
        description: dto.description,
        type: dto.type,
        createdBy: userId,
        steps: {
          create: dto.steps.map((step, index) => ({
            ...step,
            stepNumber: index + 1,
          })),
        },
      },
      include: {
        steps: true,
        creator: true,
      },
    });
  }

  async findAll() {
    return this.prisma.workflow.findMany({
      include: {
        steps: {
          orderBy: { stepNumber: 'asc' },
        },
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.workflow.findUnique({
      where: { id },
      include: {
        steps: {
          orderBy: { stepNumber: 'asc' },
        },
        creator: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.workflow.delete({
      where: { id },
    });
  }
}
