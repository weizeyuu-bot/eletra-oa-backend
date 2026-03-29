import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { SystemRolesModule } from './system-roles/system-roles.module';
import { SystemConfigModule } from './system-config/system-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(__dirname, '../.env.local'),
        path.resolve(__dirname, '../.env'),
        path.resolve(__dirname, '../../.env.local'),
        path.resolve(__dirname, '../../.env'),
      ],
      isGlobal: true,
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    ExpensesModule,
    WorkflowsModule,
    SystemRolesModule,
    SystemConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
