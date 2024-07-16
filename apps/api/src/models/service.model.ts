import { Request } from 'express';
import { TAssessment } from './assessments_fiture/assessment.model';
import { TJob } from './job.model';
import { TJobRegis } from './job_regis.model';
import { TUser } from './user.model';

export interface IService {
  getAll: (
    req: Request,
  ) => Promise<TJob[] | TAssessment[] | TJobRegis[] | TUser[] | void>;
  getById: (req: Request) => Promise<TJob | TAssessment | TJobRegis | void>;
  create: (req: Request) => Promise<TJob | TAssessment | TJobRegis | void>;
  update: (req: Request) => Promise<TJob | TAssessment | TJobRegis | void>;
  delete: (req: Request) => Promise<TJob | TAssessment | TJobRegis | void>;
}
