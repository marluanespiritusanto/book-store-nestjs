import {
  Controller,
  Delete,
  Param,
  Patch,
  Body,
  ParseIntPipe,
  Get,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ReadBookDto, CreateBookDto, UpdateBookDto } from './dtos';
import { GetUser } from '../auth/user.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadBookDto> {
    return this._bookService.get(id);
  }

  @Get()
  getRoles(): Promise<ReadBookDto[]> {
    return this._bookService.getAll();
  }

  @Post()
  createRole(@Body() role: Partial<CreateBookDto>): Promise<ReadBookDto> {
    return this._bookService.create(role);
  }

  @Post()
  createRoleByAuthor(
    @Body() role: Partial<CreateBookDto>,
    @GetUser('id') authorId: number,
  ): Promise<ReadBookDto> {
    return this._bookService.createByAuthor(role, authorId);
  }

  @Patch(':id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Partial<UpdateBookDto>,
  ) {
    return this._bookService.update(id, role);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._bookService.delete(id);
  }
}
