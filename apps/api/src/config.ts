import { CorsOptions } from 'cors';
import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

// Tentukan file lingkungan yang digunakan berdasarkan NODE_ENV
const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

// Muat variabel lingkungan dari file .env
config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file
export const PORT = process.env.PORT || 8000;
export const SECRET_KEY = process.env.SECRET_KEY || "something";
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const EMAILPASSWORD = process.env.EMAILPASSWORD;
export const EMAIL = process.env.EMAIL;
export const EMAIL_VERIFY_KEY = process.env.EMAIL_VERIFY_KEY || "-";
export const FORGET_PASSWORD_KEY = process.env.FORGET_PASSWORD_KEY || "lupa bos";
export const VERIFY_URL = process.env.VERIFY_URL;
export const FORGOT_URL = process.env.FORGOT_URL;
export const TOKEN_EXPIRY = '1h'; 

export const corsOption: CorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
