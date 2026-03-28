import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService);
    get port(): number;
    get nodeEnv(): string;
    get jwtSecret(): string;
    get jwtExpireIn(): number;
    get databaseUrl(): string;
}
