import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // Prefer .env.local for runtime DB connection, then fallback to .env
    const envLocalCandidates = [
      path.resolve(__dirname, '../.env.local'),
      path.resolve(__dirname, '../../.env.local'),
    ];
    for (const envPath of envLocalCandidates) {
      if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath, override: true });
        break;
      }
    }

    if (!process.env.DATABASE_URL) {
      const envCandidates = [
        path.resolve(__dirname, '../.env'),
        path.resolve(__dirname, '../../.env'),
      ];
      for (const envPath of envCandidates) {
        if (fs.existsSync(envPath)) {
          dotenv.config({ path: envPath });
          break;
        }
      }
    }

    const fallbackLocalUrl =
      'postgresql://postgres:postgres@localhost:5433/eletra_oa?schema=public';

    let databaseUrl = process.env.DATABASE_URL || fallbackLocalUrl;
    const switchedFromPrismaPlus = databaseUrl.startsWith('prisma+postgres://');
    if (databaseUrl.startsWith('prisma+postgres://')) {
      databaseUrl = fallbackLocalUrl;
    }

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });

    if (switchedFromPrismaPlus) {
      this.logger.warn(
        'Detected prisma+postgres URL at runtime; switched to local PostgreSQL URL.',
      );
    }

    this.logger.log(`Prisma datasource: ${databaseUrl.split('?')[0]}`);
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('数据库连接成功');
    } catch (error) {
      this.logger.error('数据库连接失败:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
