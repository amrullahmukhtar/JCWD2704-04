// import { FORGET_PASSWORD_KEY } from '../config';
// import { NextFunction, Request, Response } from 'express';
// import { verify } from 'jsonwebtoken';

// export function verifyForgot(req: Request, res: Response, next: NextFunction) {
//   const token = req.params.token;

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   verify(token, FORGET_PASSWORD_KEY, (err: Error | null, decodedToken: any) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }

//     req.user = decodedToken;
//     next();
//   });
// }
