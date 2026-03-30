import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

@Module({
  imports: [CommonModule],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
