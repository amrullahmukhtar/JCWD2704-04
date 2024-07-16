export interface IUser {
  id: string;
  email: string;
  fullname: string;

  // other user-specific fields
  role: 'user';
  gender: Gender;
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
