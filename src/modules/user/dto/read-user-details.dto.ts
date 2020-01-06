import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadUserDetailDto {
  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly lastname: string;
}
