import { PrismaService } from '../common/prisma.service';
import { CreateWorkflowDto } from './dto/workflow.dto';
export declare class WorkflowsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWorkflowDto, userId: string): Promise<{
        steps: {
            title: string;
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            approverRole: string;
            stepNumber: number;
            workflowId: string;
        }[];
        creator: {
            email: string;
            username: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            id: string;
            avatar: string | null;
            role: import(".prisma/client").$Enums.Role;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    }>;
    findAll(): Promise<({
        steps: {
            title: string;
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            approverRole: string;
            stepNumber: number;
            workflowId: string;
        }[];
        creator: {
            email: string;
            username: string;
            id: string;
        };
    } & {
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    })[]>;
    findOne(id: string): Promise<({
        steps: {
            title: string;
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            approverRole: string;
            stepNumber: number;
            workflowId: string;
        }[];
        creator: {
            email: string;
            username: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            id: string;
            avatar: string | null;
            role: import(".prisma/client").$Enums.Role;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    }) | null>;
    delete(id: string): Promise<{
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    }>;
}
