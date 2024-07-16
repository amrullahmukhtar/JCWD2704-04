/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';
import { formatRequestBody } from '../utils/formatRequestBody';
import { Gender, Prisma } from '@prisma/client';
import { generateToken } from '@/lib/jwt';
import { VERIFY_URL } from '@/config';
import { transporter } from '@/lib/nodemailer';

export class DeveloperService {
  async registerDeveloper(req: Request) {
    const { email, password, fullname } = await formatRequestBody(req, true);

    const data: Prisma.UsersCreateManyInput = {
      email,
      password,
      fullname,
      role: 'developer',
      is_verified: false,
      bank_acc_no: '0123456789',
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

export default new DeveloperService();
