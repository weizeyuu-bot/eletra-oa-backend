import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSystemRoleDto, SetRoleMenusDto, UpdateSystemRoleDto } from './dto/system-role.dto';
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

  @Get(':id/menus')
  async getRoleMenus(@Param('id', ParseIntPipe) id: number) {
    return this.systemRolesService.getRoleMenuIds(id);
  }

  @Put(':id/menus')
  async setRoleMenus(@Param('id', ParseIntPipe) id: number, @Body() dto: SetRoleMenusDto) {
    return this.systemRolesService.setRoleMenuIds(id, dto.menuIds || []);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.systemRolesService.remove(id);
  }
}
