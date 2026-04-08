import {
  ArrayUnique,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSystemRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z][a-z0-9:_-]{2,49}$/i)
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
  @MinLength(2)
  @MaxLength(30)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z][a-z0-9:_-]{2,49}$/i)
  key?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  sort?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class SetRoleMenusDto {
  @IsInt({ each: true })
  @ArrayUnique()
  menuIds: number[];
}
