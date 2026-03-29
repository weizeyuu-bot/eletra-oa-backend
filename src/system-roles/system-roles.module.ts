import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { SystemRolesController } from './system-roles.controller';
import { SystemRolesService } from './system-roles.service';

@Module({
  imports: [CommonModule],
  controllers: [SystemRolesController],
  providers: [SystemRolesService],
})
export class SystemRolesModule {}
