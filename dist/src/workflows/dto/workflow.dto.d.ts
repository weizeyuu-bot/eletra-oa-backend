import { WorkflowType } from '@prisma/client';
export declare class WorkflowStepDto {
    title: string;
    description?: string;
    approverRole: string;
}
export declare class CreateWorkflowDto {
    title: string;
    description?: string;
    type: WorkflowType;
    steps: WorkflowStepDto[];
}
