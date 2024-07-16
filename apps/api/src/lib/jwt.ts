import { sign, verify, SignOptions, Secret } from "jsonwebtoken";
import { EMAIL_VERIFY_KEY, FORGET_PASSWORD_KEY, SECRET_KEY } from '../config';

const key: Record<string, Secret> = {
  SECRET_KEY,
  EMAIL_VERIFY_KEY,
  FORGET_PASSWORD_KEY, // Perbaikan disini
};

export const generateToken = (
  data: string | object | Buffer,
  options: SignOptions = {},
  selectKey: keyof typeof key = "SECRET_KEY"
): string => {
  try {
    return sign(data, key[selectKey], options);
  } catch (err) {
    throw err;
  }
};

export const verifyToken = (
  token: string,
  selectKey: keyof typeof key = "SECRET_KEY"
): any => {
  try {
    return verify(token, key[selectKey]);
  } catch (err) {
    throw err;
  }
};

export const generateForgotPasswordToken = (
  data: string | object | Buffer,
  options: SignOptions = {}
): string => {
  try {
    return generateToken(data, options, "FORGET_PASSWORD_KEY"); // Perbaikan disini
  } catch (err) {
    throw err;
  }
};

export const verifyForgotPasswordToken = (token: string): any => {
  try {
    return verifyToken(token, "FORGET_PASSWORD_KEY"); // Perbaikan disini
  } catch (err) {
    throw err;
  }
};
