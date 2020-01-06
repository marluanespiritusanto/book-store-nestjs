import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ReadRoleDto } from './dtos';
import { CreateBookDto } from '../book/dtos';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
    return this._roleService.get(id);
  }

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  createRole(@Body() role: Partial<CreateBookDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Patch(':id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Partial<ReadRoleDto>,
  ) {
    return this._roleService.update(id, role);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this._roleService.delete(id);
  }
}
