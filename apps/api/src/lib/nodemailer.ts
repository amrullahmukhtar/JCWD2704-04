import nodemailer from "nodemailer";
import { EMAIL, EMAILPASSWORD } from "../config";

export const transporter = nodemailer.createTransport({
  service: "gmail", // Use `true` for port 465, `false` for all other ports
  auth: {
    user: EMAIL,
    pass: EMAILPASSWORD,
  },
});