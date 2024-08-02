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
  async getAllCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.getAllCompanies(req);
      res.send({
        message: 'Successfully fetched all companies',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCompanyById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.getCompanyById(req);
      res.send({
        message: 'Successfully fetched company by ID',
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
  async postContent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.postContent(req);
      res.send({
        message: 'Berhasil Post Content',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getContent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await adminService.getContent(req);
      res.send({
        message: 'Berhasil Get Company Content',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
