import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
