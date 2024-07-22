import { Staff, User } from '@prisma/client';
import { TUser } from './user.model';

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}

declare module 'Express' {
  interface Request {
    body: { [key: string]: string };
  }
}
