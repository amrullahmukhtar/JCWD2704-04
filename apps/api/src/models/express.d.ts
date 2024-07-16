import { Staff, User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;

    }
  }
}

declare module 'Express' {
  interface Request {
    body: { [key: string]: string };
  }
}
