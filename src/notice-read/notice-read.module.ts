import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { NoticeReadController } from './notice-read.controller';
import { NoticeReadService } from './notice-read.service';

@Module({
  imports: [CommonModule],
  controllers: [NoticeReadController],
  providers: [NoticeReadService],
})
export class NoticeReadModule {}
