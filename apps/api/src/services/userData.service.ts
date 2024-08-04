import { Request } from 'express';
import { prisma } from '../lib/prisma';
import { validateUser } from '@/utils/validate';
import fs from 'fs';
import path from 'path';

export class UserDataService {
  async getAllUserData(req: Request) {
    return await prisma.users.findMany();
  }

  async updateUserData(req: Request) {
    const {
      fullname,
      phone_no,
      address,
      age,
      education,
      position,
      experience,
      kota_kabupaten,
      provinsi,
    } = req.body;
    validateUser(req);

    return await prisma.users.update({
      where: { id: String(req.params.id) },
      data: {
        fullname,
        phone_no,
        address,
        age: Number(age),
        education,
        position,
        experience,
        kota_kabupaten,
        provinsi,
      },
    });
  }

  async uploadAvatar(req: Request) {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const avatar = req.file.buffer;
    const uploadDir = path.join(__dirname, '../uploads/avatars');

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, `${req.params.id}_avatar.jpg`);

    // Save image to disk
    fs.writeFileSync(uploadPath, avatar);

    // Generate URL for image
    const avatarUrl = `/uploads/avatars/${req.params.id}_avatar.jpg`;
    validateUser(req);

    return await prisma.users.update({
      where: { id: String(req.params.id) },
      data: { avatarUrl }, // Save image URL to database
    });
  }

  async submitCV(req: Request) {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      throw new Error('Only PDF files are allowed');
    }

    const { buffer } = req.file;
    const uploadDir = path.join(__dirname, '../uploads/cvs');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, `${req.params.id}_cv.pdf`);

    try {
      fs.writeFileSync(uploadPath, buffer);
    } catch (error) {
      throw new Error('Failed to save file');
    }

    const cvUrl = `/uploads/cvs/${req.params.id}_cv.pdf`;
    validateUser(req);

    try {
      return await prisma.users.update({
        where: { id: String(req.params.id) },
        data: { cvUrl },
      });
    } catch (error) {
      throw new Error('Failed to update database');
    }
  }

  async getCV(req: Request) {
    const userId = String(req.params.id);

    validateUser(req);

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { cvUrl: true },
    });

    if (!user || !user.cvUrl) {
      throw new Error('CV not found');
    }

    const cvPath = path.join(__dirname, '../uploads/cvs', `${userId}_cv.pdf`);
    if (!fs.existsSync(cvPath)) {
      throw new Error('CV file does not exist');
    }

    return cvPath;
  }
}

export default new UserDataService();
