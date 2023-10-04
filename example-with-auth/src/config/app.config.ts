import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  env: process.env.APP_ENV,
  salt: process.env.PASSWORD_SALT,
  jwtSecretKey: process.env.JWT_PRIVATE_KEY,
}));
