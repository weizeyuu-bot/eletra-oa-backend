import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/workflow.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowsController {
  constructor(private workflowsService: WorkflowsService) {}

  @Post()
  async create(@Body() dto: CreateWorkflowDto, @Request() req) {
    return this.workflowsService.create(dto, req.user.id);
  }

  @Get()
  async findAll() {
    return this.workflowsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.workflowsService.delete(id);
  }
}
