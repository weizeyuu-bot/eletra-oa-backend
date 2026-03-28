import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
