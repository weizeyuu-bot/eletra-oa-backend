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
import { AttachmentsModule } from './attachments/attachments.module';
import { TravelModule } from './travel/travel.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ReportsModule } from './reports/reports.module';
import { AuditModule } from './audit/audit.module';
import { NoticeReadModule } from './notice-read/notice-read.module';

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
    AttachmentsModule,
    TravelModule,
    AttendanceModule,
    ReportsModule,
    AuditModule,
    NoticeReadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
