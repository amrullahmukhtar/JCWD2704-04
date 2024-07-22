/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';

export class JobService {
  async getAlljob(req: Request) {
    return await prisma.job.findMany();
  }

  async getjobById(req: Request) {
    const { job_Id } = req.params;

    return await prisma.job.findMany({
      where: { id: Number(job_Id) },
    });
  }
}

export default new JobService();
