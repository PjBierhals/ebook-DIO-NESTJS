import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RequiredPermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Roles('ADMIN')
  @RequiredPermissions('CRIAR')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @Roles('ADMIN', 'GESTOR', 'USUARIO')
  @RequiredPermissions('LER')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'GESTOR', 'USUARIO')
  @RequiredPermissions('LER')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'GESTOR')
  @RequiredPermissions('ALTERAR')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @RequiredPermissions('DELETAR')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
