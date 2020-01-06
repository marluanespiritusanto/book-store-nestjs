import { createParamDecorator } from '@nestjs/common';
import { ReadUserDto } from 'dist/modules/user/dto';

export const GetUser = createParamDecorator(
  (data, req): ReadUserDto => {
    return req.user;
  },
);
