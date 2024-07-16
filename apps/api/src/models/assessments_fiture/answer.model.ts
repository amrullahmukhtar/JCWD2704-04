import { Answer_status } from '@prisma/client';

export type TAnswer = {
  id: number;
  question_id: number;
  answer: string;
  status: Answer_status;
};
