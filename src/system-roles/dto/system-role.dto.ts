import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSystemRoleDto {
  @IsString()
  name: string;

  @IsString()
  key: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  sort?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UpdateSystemRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  key?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  sort?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
