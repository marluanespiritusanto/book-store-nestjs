import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadUserDetailDto {
  @Expose()
  @IsNumber()
  readonly name: number;

  @Expose()
  @IsString()
  readonly lastname: string;
}
