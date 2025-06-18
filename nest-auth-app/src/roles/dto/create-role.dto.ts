import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'O nome da função é obrigatório.' })
  @IsString({ message: 'O nome da função deve ser uma string.' })
  @MaxLength(50, {
    message: 'O nome da função não pode ter mais de 50 caracteres.',
  })
  name: string;
  @IsOptional()
  @IsArray({ message: 'As permissões devem ser um array de IDs.' })
  permissions?: string[];
  permissionIds?: string[];
}
