import { Request } from "express";
import { genSalt, hash } from "bcrypt";

export async function formatRequestBody(
  req: Request,
  hashPassword: boolean = false
) {
  Object.entries(req.body as { [key: string]: string }).forEach((e, i) => {
    const key = e[0];
    const value = e[1];
    req.body[key] = value.trim();
  });
  const { email, password } = req.body;

  if (email) {
    req.body.email = email.toLowerCase();
  }

  //Encrypt
  if (hashPassword) {
    const salt = await genSalt(10);
    req.body.password = await hash(password, salt);
  }
  return req.body;
}
