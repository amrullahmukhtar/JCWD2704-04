/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';
import { validateUser } from '@/auth';

export class UserDataService {
  async getAllUserData(req: Request) {
    return await prisma.users.findMany();
  }

  async getUserDataById(req: Request) {
    const { user_Id } = req.params;

    return await prisma.users.findUnique({
      where: { id: String(user_Id) },
    });
  }
  async updateUserData(req: Request) {
    const {
      fullname,
      curriculum_vitae,
      avatar,
      phone_no,
      address,
      age,
      education,
      position,
      experience,
      kota_kabupaten,
    } = req.body;
    validateUser(req);
  
    return await prisma.users.update({
      where: { id: String(req.params.id) },
      data: {
        fullname,
        curriculum_vitae: curriculum_vitae
          ? Buffer.from(curriculum_vitae)
          : undefined,
        avatar: avatar ? Buffer.from(avatar) : undefined,
        phone_no,
        address,
        age: Number(age),
        education,
        position,
        experience,
        kota_kabupaten,
      },
    });
    
  }
}

export default new UserDataService();
