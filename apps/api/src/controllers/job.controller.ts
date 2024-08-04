import jobService from '../services/job.service';
import { NextFunction, Request, Response } from 'express';

export class JobController {
  async getAllJob(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await jobService.getAlljob(req);
      res.send({
        message: 'Fetched all jobs',
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
        message: 'Fetched job by ID',
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
        message: 'Fetched jobs by company ID',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async applyJob(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await jobService.applyJob(req);
      res.send({
        message: 'Job application submitted successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getApplicationsByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await jobService.getApplicationsByUser(req);
      res.send({
        message: 'Fetched applications by user',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await jobService.getApplicationDetails(req);
      res.send({
        message: 'Fetched application details',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new JobController();
