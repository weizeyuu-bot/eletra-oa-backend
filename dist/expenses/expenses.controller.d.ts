import { ExpensesService } from './expenses.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
export declare class ExpensesController {
    private expensesService;
    constructor(expensesService: ExpensesService);
    create(dto: CreateExpenseDto, req: any): Promise<{
        submitter: {
            email: string;
            username: string;
            id: string;
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
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
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
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
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
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
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
        attachments: string[];
        submittedBy: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        amount: number;
        currency: string;
        category: string;
        description: string | null;
        attachments: string[];
        submittedBy: string;
    }>;
}
