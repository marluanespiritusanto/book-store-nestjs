import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((key, req) =>
  key ? req.user[key] : req.user,
);
