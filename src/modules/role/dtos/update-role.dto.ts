import { IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly descriptiob: string;
}
