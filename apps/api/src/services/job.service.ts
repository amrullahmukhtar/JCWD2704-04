/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';

export class JobService {
  async getAlljob(req: Request) {
    return await prisma.job.findMany();
  }

  async getjobById(req: Request) {
    const { id } = req.params;

    return await prisma.job.findUnique({
      where: { id: Number(id) },
    });
  }

  async getJobsByCompany(req: Request) {
    const { admin_id } = req.params;

    return await prisma.job.findMany({
      where: { admin_id: admin_id },
    });
  }

  async applyJob(req: Request) {
    const { jobId } = req.params;
    const { userId, salaryExpectation } = req.body;

    // Check if the user has already applied for this job
    const existingApplication = await prisma.job_regis.findUnique({
      where: { job_id_user_id: { job_id: Number(jobId), user_id: userId } },
    });

    if (existingApplication) {
      throw new Error('You have already applied for this job.');
    }

    // Check if the user has uploaded a CV and provided salary expectations
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { cvUrl: true },
    });

    if (!user || !user.cvUrl) {
      throw new Error('Please upload your CV and provide your salary expectations.');
    }

    // Create a new job registration
    return await prisma.job_regis.create({
      data: {
        job_id: Number(jobId),
        user_id: userId,
        application_date: new Date(),
        salary_expectation: Number(salaryExpectation),
      },
    });
  }
  async getApplicationsByUser(req: Request) {
    const { userId } = req.params;
    return await prisma.job_regis.findMany({
      where: { user_id: userId },
      include: {
        job: true,
      },
    });
  }

  async getApplicationDetails(req: Request) {
    const {  userId, jobId } = req.params;
    return await prisma.job_regis.findUnique({
      where: {
        job_id_user_id: {
          user_id: userId,
          job_id: Number(jobId),
          
        },
      },
      include: {
        job: true,
      },
    });
  }
}

export default new JobService();
