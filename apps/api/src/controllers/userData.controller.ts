import userDataService from '@/services/userData.service';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

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

  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }

      const data = await userDataService.uploadAvatar(req);

      res.send({
        message: 'Avatar uploaded successfully',
        avatarUrl: data.avatarUrl, // Return image URL
      });
    } catch (error) {
      // Handle multer-related errors
      if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({ message: 'File size exceeds the 100 KB limit' });
      }

      next(error);
    }
  }
  
  

  async submitCV(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userDataService.submitCV(req);
      res.send({
        message: 'CV submitted successfully',
        cvUrl: data.cvUrl, // Return CV URL
      });
    } catch (error:any) {
      if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({ message: 'File size exceeds the 1 MB limit' });
      }
      if (error.message === 'Only PDF files are allowed') {
        return res.status(400).send({ message: 'Only PDF files are allowed' });
      }
      next(error);
    }
  }

  async downloadCV(req: Request, res: Response, next: NextFunction) {
    try {
      const cvPath = await userDataService.getCV(req);
      res.download(cvPath);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserDataController();
