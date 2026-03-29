import { ExpenseStatus } from '@prisma/client';
export declare class CreateExpenseDto {
    title: string;
    amount: number;
    currency?: string;
    category: string;
    description?: string;
    attachments?: string[];
}
export declare class UpdateExpenseDto {
    title?: string;
    amount?: number;
    category?: string;
    status?: ExpenseStatus;
}
