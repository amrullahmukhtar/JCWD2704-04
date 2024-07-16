import { TQuestion } from './question.model';
import { TUserAssessment } from './user_assessment.model';

export type TAssessment = {
  id: String;
  developer_id: string;
  title: string;
  created_at: Date;
  question?: TQuestion[];
  user_assessment?: TUserAssessment[] | undefined;
};
