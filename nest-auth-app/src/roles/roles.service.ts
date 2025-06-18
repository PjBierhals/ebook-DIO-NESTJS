import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name, permissions } = createRoleDto;

    const uniquePermissionIds = new Set<string>();
    if (permissions && permissions.length > 0) {
      permissions.forEach((id) => uniquePermissionIds.add(id));
    }

    const permissionsToConnect = Array.from(uniquePermissionIds).map((id) => ({
      id,
    }));

    return await this.prisma.role.create({
      data: {
        name: name,
        permissions: {
          connect: permissionsToConnect,
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
  async remove(id: string) {
    return await this.prisma.role.delete({
      where: { id },
    });
  }
  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const { name, permissions } = updateRoleDto;

    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundException(`Função com ID "${id}" não encontrada.`);
    }

    const updateData: {
      name?: string;
      permissions?: {
        set?: { id: string }[];
      };
    } = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (permissions !== undefined) {
      const uniquePermissions = new Set<string>(permissions);

      const permissionsToSet = Array.from(uniquePermissions).map((id) => ({
        id,
      }));

      updateData.permissions = {
        set: permissionsToSet,
      };
    }

    if (Object.keys(updateData).length === 0) {
      return existingRole;
    }

    return await this.prisma.role.update({
      where: { id },
      data: updateData,
      include: {
        permissions: true,
      },
    });
  }
}
