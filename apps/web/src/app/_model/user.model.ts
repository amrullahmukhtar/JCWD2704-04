export interface IUser {
  id: string;
  email: string;
  fullname: string;

  // Prisma specific fields
  curriculum_vitae?: Buffer;
  avatar?: Buffer;
  phone_no?: string;

  // Additional user-specific fields
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
  id: string;
  email: string;
  // other admin-specific fields
  role: 'admin';
  company_name: string;
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


