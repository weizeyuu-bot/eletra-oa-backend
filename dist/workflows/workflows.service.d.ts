import { PrismaService } from '../common/prisma.service';
import { CreateWorkflowDto } from './dto/workflow.dto';
export declare class WorkflowsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWorkflowDto, userId: string): Promise<{
        steps: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
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
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        createdBy: string;
    }>;
    findAll(): Promise<({
        steps: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
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
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        createdBy: string;
    })[]>;
    findOne(id: string): Promise<({
        steps: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
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
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        createdBy: string;
    }) | null>;
    delete(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.WorkflowStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        type: import(".prisma/client").$Enums.WorkflowType;
        createdBy: string;
    }>;
}
