import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'O nome da função é obrigatório.' })
  @IsString({ message: 'O nome da função deve ser uma string.' })
  @MaxLength(50, {
    message: 'O nome da função não pode ter mais de 50 caracteres.',
  })
  name: string;

  // As relações 'permissions' e 'users' geralmente são gerenciadas
  // em endpoints separados ou através de IDs.
  // Se você precisasse associar permissões durante a criação,
  // poderia adicionar algo como:
  // Importe IsOptional, IsArray, IsUUID de 'class-validator' se for usar.
  // import { IsOptional, IsArray, IsUUID } from 'class-validator';
  // @IsOptional()
  // @IsArray({ message: 'As permissões devem ser um array.' })
  // @IsUUID('4', { each: true, message: 'Cada ID de permissão deve ser um UUID válido.' })
  // A correção está aqui:
  @IsOptional()
  @IsArray({ message: 'As permissões devem ser um array de IDs.' })
  @IsUUID('4', {
    each: true,
    message: 'Cada ID de permissão deve ser um UUID válido (versão 4).',
  })
  permissions?: string[];
  permissionIds?: string[]; // Correto: array de strings
}
