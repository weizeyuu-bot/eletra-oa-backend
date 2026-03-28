import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 3001);
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET', 'your_super_secret_jwt_key');
  }

  get jwtExpireIn(): number {
    return parseInt(this.configService.get<string>('JWT_EXPIRATION', '3600'), 10);
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5433/eletra_oa?schema=public');
  }
}
