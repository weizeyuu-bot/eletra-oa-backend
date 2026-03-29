import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSystemRoleDto, UpdateSystemRoleDto } from './dto/system-role.dto';
import { SystemRolesService } from './system-roles.service';

@Controller('api/system/roles')
@UseGuards(JwtAuthGuard)
export class SystemRolesController {
  constructor(private readonly systemRolesService: SystemRolesService) {}

  @Post()
  async create(@Body() dto: CreateSystemRoleDto) {
    return this.systemRolesService.create(dto);
  }

  @Get()
  async findAll() {
    return this.systemRolesService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSystemRoleDto) {
    return this.systemRolesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.systemRolesService.remove(id);
  }
}
