import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreatePermissionDto {
  @IsNotEmpty({ message: 'É Obrigatório' })
  @IsString({ message: 'Deve ser uma string.' })
  @MinLength(3, { message: ' No minimo 3' })
  name: string;
}
