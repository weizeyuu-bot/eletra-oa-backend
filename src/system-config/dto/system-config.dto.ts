import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SaveMenuDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  sort: number;

  @IsString()
  permission: string;

  @IsString()
  component: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class SaveDeptDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  sort: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class SavePostDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  sort: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class SaveDictDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  remark?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class SaveNoticeDto {
  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString()
  @IsOptional()
  creator?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  isNew?: boolean;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
