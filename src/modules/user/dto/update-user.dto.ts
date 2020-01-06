import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUserDto {
  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsString()
  readonly email: string;
}
