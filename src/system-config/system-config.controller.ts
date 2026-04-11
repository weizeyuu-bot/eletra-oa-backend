import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  SaveDeptDto,
  SaveDictDto,
  SaveMenuDto,
  SaveNoticeDto,
  SavePostDto,
} from './dto/system-config.dto';
import { SystemConfigService } from './system-config.service';

@Controller('api/system')
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @Get('menus')
  findMenus() {
    return this.systemConfigService.findMenus();
  }

  @Post('menus')
  createMenu(@Body() dto: SaveMenuDto) {
    return this.systemConfigService.createMenu(dto);
  }

  @Patch('menus/:id')
  updateMenu(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<SaveMenuDto>) {
    return this.systemConfigService.updateMenu(id, dto);
  }

  @Delete('menus/:id')
  removeMenu(@Param('id', ParseIntPipe) id: number) {
    return this.systemConfigService.removeMenu(id);
  }

  @Get('depts')
  findDepts() {
    return this.systemConfigService.findDepts();
  }

  @Post('depts')
  createDept(@Body() dto: SaveDeptDto) {
    return this.systemConfigService.createDept(dto);
  }

  @Patch('depts/:id')
  updateDept(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<SaveDeptDto>) {
    return this.systemConfigService.updateDept(id, dto);
  }

  @Delete('depts/:id')
  removeDept(@Param('id', ParseIntPipe) id: number) {
    return this.systemConfigService.removeDept(id);
  }

  @Get('posts')
  findPosts() {
    return this.systemConfigService.findPosts();
  }

  @Post('posts')
  createPost(@Body() dto: SavePostDto) {
    return this.systemConfigService.createPost(dto);
  }

  @Patch('posts/:id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<SavePostDto>) {
    return this.systemConfigService.updatePost(id, dto);
  }

  @Delete('posts/:id')
  removePost(@Param('id', ParseIntPipe) id: number) {
    return this.systemConfigService.removePost(id);
  }

  @Get('dicts')
  findDicts() {
    return this.systemConfigService.findDicts();
  }

  @Post('dicts')
  createDict(@Body() dto: SaveDictDto) {
    return this.systemConfigService.createDict(dto);
  }

  @Patch('dicts/:id')
  updateDict(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<SaveDictDto>) {
    return this.systemConfigService.updateDict(id, dto);
  }

  @Delete('dicts/:id')
  removeDict(@Param('id', ParseIntPipe) id: number) {
    return this.systemConfigService.removeDict(id);
  }

  @Get('notices')
  findNotices() {
    return this.systemConfigService.findNotices();
  }

  @Post('notices')
  createNotice(@Body() dto: SaveNoticeDto) {
    // log incoming payload for debugging
    // eslint-disable-next-line no-console
    console.log('[DEBUG] createNotice payload:', JSON.stringify(dto));
    return this.systemConfigService.createNotice(dto);
  }

  @Patch('notices/:id')
  updateNotice(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<SaveNoticeDto>) {
    return this.systemConfigService.updateNotice(id, dto);
  }

  @Delete('notices/:id')
  removeNotice(@Param('id', ParseIntPipe) id: number) {
    return this.systemConfigService.removeNotice(id);
  }
}
