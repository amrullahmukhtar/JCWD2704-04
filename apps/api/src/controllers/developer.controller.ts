/** @format */

import developerService from '../services/developer.service';
import { NextFunction, Request, Response } from 'express';

export class userController {
  async registerDeveloper(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await developerService.registerDeveloper(req);
      res.send({
        message: 'success register Developer',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
