import { IsString } from 'class-validator';
import { ReadUserDto } from '../../user/dto';
import { Type, Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @Type(() => ReadUserDto)
  user: ReadUserDto;
}
