import userDataService from '@/services/userData.service';
import { NextFunction, Request, Response } from 'express';

export class UserDataController {
  async getAllUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userDataService.getAllUserData(req);
      res.send({
        message: 'fetch Userdata',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getUserDataById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userDataService.getUserDataById(req);
      res.send({
        message: 'fetch Userdata by Id',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userDataService.updateUserData(req);
      res.send({
        message: 'fetch Userdata by Id',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserDataController();
