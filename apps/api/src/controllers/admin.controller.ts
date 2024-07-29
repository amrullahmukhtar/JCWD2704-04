/** @format */

import adminService from '../services/admin.service';
import { NextFunction, Request, Response } from 'express';

export class userController {
  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.registerAdmin(req);
      res.send({
        message: 'success register Developer',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateAdminData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.updateAdminData(req);
      res.send({
        message: 'fetch Userdata by Id',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
