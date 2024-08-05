/** @format */
import { Request } from 'express';
import { prisma } from '../lib/prisma';
import { formatRequestBody } from '../utils/formatRequestBody';
import { Gender, Prisma } from '@prisma/client';
import { generateToken } from '@/lib/jwt';
import { transporter } from '@/lib/nodemailer';
import { VERIFY_URL } from '@/config';
import { validateAdmin } from '@/utils/validate';

export class AdminService {
  async registerAdmin(req: Request) {
    const { email, password, company_name } = await formatRequestBody(
      req,
      true,
    );

    const data: Prisma.UsersCreateManyInput = {
      email,
      password,
      company_name,
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
  async getAllCompanies(req: Request) {
    // Retrieve all users with role 'admin' which represents companies
    return await prisma.users.findMany({
      where: {
        role: 'admin',
      },
      select: {
        id: true,
        company_name: true,
        company_summary: true,
        company_location: true,
        contact_email: true,
      },
    });
  }
  async getCompanyById(req: Request) {
    const { id } = req.params;

    return await prisma.users.findUnique({
      where: { id: String(id) },
      select: {
        id: true,
        company_name: true,
        company_summary: true,
        company_location: true,
        contact_email: true,
      },
    });
  }

  async updateAdminData(req: Request) {
    const {
      company_name,
      company_summary,
      company_location,
      contact_email,
      contact_phone,
      experience,
      kota_kabupaten,
      provinsi,
    } = req.body;

    validateAdmin(req);

    return await prisma.users.update({
      where: { id: String(req.params.id) },
      data: {
        company_name,
        company_summary,
        company_location,
        contact_email,
        contact_phone,
        experience,
        kota_kabupaten,
        provinsi,
      },
    });
  }

  async postContent(req: Request) {
    const { content } = req.body;

    validateAdmin(req);

    return await prisma.company_content.create({
      data: {
        company_id: String(req.params.company_id), // Ensure this is a valid company_id
        content,
        
      },
    });
  }
  async getContent(req: Request) {
    const { company_id } = req.params;

    validateAdmin(req);

    return await prisma.company_content.findMany({
      where: { company_id: String(company_id) },
    });
  }
}

export default new AdminService();
