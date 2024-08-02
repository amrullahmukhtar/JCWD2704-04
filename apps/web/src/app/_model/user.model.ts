export interface IUser {
  id: string;
  email: string;
  fullname: string;
  role: 'user';
  curriculum_vitae?: Buffer;
  avatar?: Buffer;
  avatarUrl?: string;
  cvUrl?: string;
  phone_no?: string;
  address?: string;
  age?: number;
  education?: string;
  position?: string;
  experience?: string;
  kota_kabupaten?: string;
  provinsi?: string;
  date_of_birth?: Date;
  salary_expectations?: number;
  subs_mode: 'none' | 'other'; // Assuming Subs_mode is an enum with these values
  subs_start_date?: Date;
  subs_end_date?: Date;
}

export interface IAdmin {
  company_id: string;
  id: string;
  email: string;
  role: 'admin';
  company_name?: string;
  company_logo?: string;
  company_summary?: string;
  company_location?: string;
  contact_email?: string;
  contact_phone?: string;
  kota_kabupaten?: string;
  provinsi?: string;
}

export interface IDeveloper {
  id: string;
  email: string;
  fullname: string;
  // other developer-specific fields
  role: 'developer';
  bank_acc_no: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
}
