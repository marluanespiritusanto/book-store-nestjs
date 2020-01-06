import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { ReadBookDto, UpdateBookDto, CreateBookDto } from './dtos';
import { plainToClass } from 'class-transformer';
import { Book } from './book.entity';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(id: number): Promise<ReadBookDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const book: Book = await this._bookRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!book) {
      throw new NotFoundException();
    }

    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const roles: Book[] = await this._bookRepository.find({
      where: { status: 'ACTIVE' },
    });

    return roles.map(role => plainToClass(ReadBookDto, role));
  }

  async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: User[] = [];

    for (const authorId of book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: 'ACTIVE' },
      });

      if (!authorExists) {
        throw new NotFoundException(
          `There's not an author with this Id: ${authorId}`,
        );
      }

      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new ConflictException(`This user ${authorId} is not an author`);
      }

      authors.push(authorExists);
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async createByAuthor(book: Partial<CreateBookDto>, authorId: number) {
    const author = await this._userRepository.findOne(authorId, {
      where: { status: 'INACTIVE' },
    });

    const isAuthor = author.roles.some(
      (role: Role) => role.name === RoleType.ADMINISTRATOR,
    );

    if (!isAuthor) {
      throw new ConflictException(`This user ${authorId} is not an author`);
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      author,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async update(
    bookId: number,
    role: Partial<UpdateBookDto>,
  ): Promise<ReadBookDto> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new NotFoundException('This book does not exists');
    }

    const updatedBook = await this._bookRepository.update(bookId, role);
    return plainToClass(ReadBookDto, updatedBook);
  }

  async delete(id: number): Promise<void> {
    const bookExists = await this._bookRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new NotFoundException('This book does not exists');
    }

    await this._bookRepository.update(id, { status: 'INACTIVE' });
  }
}
