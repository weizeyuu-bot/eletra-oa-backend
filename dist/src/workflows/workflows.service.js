"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let WorkflowsService = class WorkflowsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
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
    async findOne(id) {
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
    async delete(id) {
        return this.prisma.workflow.delete({
            where: { id },
        });
    }
};
exports.WorkflowsService = WorkflowsService;
exports.WorkflowsService = WorkflowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowsService);
//# sourceMappingURL=workflows.service.js.map