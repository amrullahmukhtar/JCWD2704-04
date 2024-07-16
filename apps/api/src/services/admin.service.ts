/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';
import { formatRequestBody } from '../utils/formatRequestBody';
import { Gender, Prisma } from '@prisma/client';
import { generateToken } from '@/lib/jwt';
import { transporter } from '@/lib/nodemailer';
import { VERIFY_URL } from '@/config';

export class AdminService {
  async registerAdmin(req: Request) {
    const { email, password, company_name } = await formatRequestBody(req, true);

    const data: Prisma.UsersCreateManyInput = {
      email,
      password,
      company_name ,
      role: 'admin',
      is_verified: false,
    };

    let createdUser: { [x: string]: any } = {};
    await prisma.$transaction(async (prisma) => {
      createdUser = await prisma.users.create({ data });
    });

    if (!createdUser?.id) {
      throw new Error('Fail create user');
    }

    const token = generateToken(
      { id: createdUser.id },
      { expiresIn: '1h' },
      'EMAIL_VERIFY_KEY',
    );

    const a = await transporter.sendMail({
      to: email,
      subject: 'Register to CareerAvenue',
      text: 'verify your account',
      html: `<b>Click the link to verify your account: <a href="${VERIFY_URL + '?token=' + token}">Verify Email</a></b>`,
    });

    return a;
  }
}

export default new AdminService();
