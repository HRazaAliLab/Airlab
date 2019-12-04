import * as bcrypt from "bcryptjs";

export async function getPasswordHash(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePasswordHash(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
