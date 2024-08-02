import jobService from '../services/job.service';
import { NextFunction, Request, Response } from 'express';

export class JobController {
  async getAllJob(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await jobService.getAlljob(req);
      res.send({
        message: 'fetch Job',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await jobService.getjobById(req);
      res.send({
        message: 'fetch Job by Job Id',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getJobsByCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await jobService.getJobsByCompany(req);
      res.send({
        message: 'fetch Job by Job Id',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new JobController();
