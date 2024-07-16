import { Regis_status } from '@prisma/client';

export type TJobRegis = {
  job_id: string;
  user_id: string;
  application_date: Date;
  status: Regis_status;
  interview_date?: Date | undefined;
  review?: string;
};
