import { PrismaService } from '../common/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateExpenseDto, userId: string): Promise<{
        submitter: {
            email: string;
            username: string;
            id: string;
        };
    } & {
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        attachments: string[];
        submittedBy: string;
    }>;
    findAll(): Promise<({
        approvals: {
            comment: string | null;
            id: string;
            status: import(".prisma/client").$Enums.ApprovalStatus;
            createdAt: Date;
            updatedAt: Date;
            workflowId: string;
            expenseId: string | null;
            approvedBy: string;
        }[];
        comments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            expenseId: string;
            content: string;
            authorId: string;
        }[];
        submitter: {
            email: string;
            username: string;
            id: string;
        };
    } & {
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        attachments: string[];
        submittedBy: string;
    })[]>;
    findOne(id: string): Promise<({
        approvals: ({
            approver: {
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
            comment: string | null;
            id: string;
            status: import(".prisma/client").$Enums.ApprovalStatus;
            createdAt: Date;
            updatedAt: Date;
            workflowId: string;
            expenseId: string | null;
            approvedBy: string;
        })[];
        comments: ({
            author: {
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
            createdAt: Date;
            updatedAt: Date;
            expenseId: string;
            content: string;
            authorId: string;
        })[];
        submitter: {
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
        amount: number;
        currency: string;
        category: string;
        description: string | null;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        attachments: string[];
        submittedBy: string;
    }) | null>;
    update(id: string, dto: UpdateExpenseDto): Promise<{
        submitter: {
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
        amount: number;
        currency: string;
        category: string;
        description: string | null;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        attachments: string[];
        submittedBy: string;
    }>;
    delete(id: string): Promise<{
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        attachments: string[];
        submittedBy: string;
    }>;
}
