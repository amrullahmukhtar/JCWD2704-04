export interface IJob {
  id: number;
  title: string;
  company_name: string;
  location: string;
  latitude: number;
  longitude: number;
  posted_date: string;
  category: string; // New category field
  distance?: number; // Optional distance field
  description?: string; // Optional description field (if you want to include it)
  hire_position?: string; // Optional hire_position field (if applicable)
  status?: string; // Optional status field (if applicable)
  closing_date?: string; // Optional closing_date field (if applicable)
}
