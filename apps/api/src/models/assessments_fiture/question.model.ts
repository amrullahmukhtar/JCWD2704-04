import { TAnswer } from './answer.model';
import { TUserAnswer } from './user_answer.model';

export type TQuestion = {
  id: string;
  assessment_id: string;
  question: string;
  answer: TAnswer[];
  user_answer: TUserAnswer | undefined;
};
