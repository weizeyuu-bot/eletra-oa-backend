import { PrismaService } from '../common/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        email: string;
        username: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        username: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
    } | null>;
}
