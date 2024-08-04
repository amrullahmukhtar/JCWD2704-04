import nodemailer from "nodemailer";
import { EMAIL, EMAILPASSWORD } from "../config";

export const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: EMAIL,
    pass: EMAILPASSWORD,
  },
});