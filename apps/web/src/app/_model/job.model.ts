export interface IJob {
  id: number;
  title: string;
  company_name: string;
  location: string;
  latitude: number;
  longitude: number;
  posted_date: string;
  category: string; 
  distance?: number; 
  description?: string; 
  hire_position?: string;
  status?: string; 
  closing_date?: string; 
}

export interface IJobRegis {
  job_id: number; 
  user_id: string; 
  application_date: string; 
  salary_expectation: number; 
  status: string; 
  interview_date?: string; 
  review?: string; 
  job: IJob; 
}
