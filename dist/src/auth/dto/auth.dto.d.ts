export declare class RegisterDto {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    access_token: string;
    user: {
        id: string;
        email: string;
        username: string;
        role: string;
    };
}
