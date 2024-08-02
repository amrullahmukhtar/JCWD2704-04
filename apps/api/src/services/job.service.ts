/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';

export class JobService {
  async getAlljob(req: Request) {
    return await prisma.job.findMany();
  }

  async getjobById(req: Request) {
    const { id } = req.params;

    return await prisma.job.findMany({
      where: { id: Number(id) },
    });
  }
  async getJobsByCompany(req: Request) {
    const { admin_id } = req.params;

    return await prisma.job.findMany({
      where: { admin_id: admin_id },
    });
  }

}

export default new JobService();
