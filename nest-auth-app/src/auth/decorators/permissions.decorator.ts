import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions'; // A chave do metadata pode permanecer a mesma
// Renomeie a função exportada de 'Permissions' para 'RequiredPermissions'
export const RequiredPermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
