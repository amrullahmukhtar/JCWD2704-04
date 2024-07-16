import { Post_status } from '@prisma/client';

export type TJob = {
  id: string;
  admin_id: string;
  title: string;
  description: string;
  status: Post_status;
  posted_date: Date;
  closing_date: Date;
};
