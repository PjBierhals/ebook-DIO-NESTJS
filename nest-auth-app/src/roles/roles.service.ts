import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name, permissions } = createRoleDto;

    const DEFAULT_PERMISSION_ID = 'b35fd4c8-4654-44d9-b4db-2849c015d96a';

    const uniquePermissionIds = new Set<string>();
    uniquePermissionIds.add(DEFAULT_PERMISSION_ID); // Adiciona 'b35fd4c8-4654-44d9-b4db-2849c015d96a' ao Set

    // permissionIds NÃO é vazio, então o loop será executado:
    if (permissions && permissions.length > 0) {
      permissions.forEach((id) => uniquePermissionIds.add(id)); // Adiciona 'a7038682-71ba-488d-81ed-1b5e54e83e10' ao Set
    }

    const permissionsToConnect = Array.from(uniquePermissionIds).map((id) => ({
      id,
    }));
    return await this.prisma.role.create({
      data: {
        name: name,
        permissions: {
          connect: permissionsToConnect, // Conecta ambas as permissões
        },
      },
      include: {
        permissions: true,
      },
    });
  }
  async findAll() {
    return await this.prisma.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const { name, permissions } = updateRoleDto; // Desestrutura o DTO. 'permissions' pode ser undefined aqui.

    // Define o ID da permissão padrão que será SEMPRE incluída se as permissões forem atualizadas.
    const DEFAULT_PERMISSION_ID = 'b35fd4c8-4654-44d9-b4db-2849c015d96a';

    // 1. Verifica se a Role existe
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundException(`Função com ID "${id}" não encontrada.`);
    }

    // Objeto para armazenar os dados de atualização da Role
    const updateData: {
      name?: string;
      permissions?: {
        set?: { id: string }[]; // Para remover todas as antigas e adicionar as novas
      };
    } = {};

    // 2. Atualiza o nome se foi fornecido no DTO
    if (name !== undefined) {
      updateData.name = name;
    }

    // 3. Atualiza as permissões se 'permissions' foi fornecido no DTO
    if (permissions !== undefined) {
      // Verifica se o array 'permissions' foi enviado na requisição
      const uniquePermissionsForUpdate = new Set<string>();
      uniquePermissionsForUpdate.add(DEFAULT_PERMISSION_ID); // Adiciona a permissão padrão

      if (permissions.length > 0) {
        permissions.forEach((permId) => uniquePermissionsForUpdate.add(permId));
      }

      // Converte o Set de IDs únicos para o formato que o Prisma espera
      const newPermissionsToSet = Array.from(uniquePermissionsForUpdate).map(
        (id) => ({ id }),
      );

      // Usa 'set' para substituir completamente as permissões existentes
      // Isso irá desconectar as antigas e conectar as novas.
      updateData.permissions = {
        set: newPermissionsToSet,
      };
    }

    // Se não houver dados para atualizar (nem nome, nem permissões foram fornecidos no DTO)
    if (Object.keys(updateData).length === 0) {
      return existingRole; // Retorna a Role existente sem fazer nenhuma alteração no DB
    }

    // 4. Executa a atualização no Prisma
    return await this.prisma.role.update({
      where: { id },
      data: updateData,
      include: {
        permissions: true, // Inclui as permissões na resposta para ver o resultado da atualização
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.role.delete({
      where: { id },
    });
  }
}
