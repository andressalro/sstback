import "dotenv/config";

export default class EnvConfig {
  static NODE_ENV: string | undefined = process.env.NODE_ENV;
  static PORT: string | undefined = process.env.PORT;
  static API_MEDICARTE: string | undefined = process.env.API_MEDICARTE;
  static TOKEN: string | undefined = process.env.TOKEN;
  static API_KEY: string | undefined = process.env.API_KEY;
  static DB_NAME: string | undefined = process.env.DB_NAME;
  static DB_USER: string | undefined = process.env.DB_USER;
  static DB_PASS: string | undefined = process.env.DB_PASS;
  static DB_HOST: string | undefined = process.env.DB_HOST;
  static DB_PORT: string | undefined = process.env.DBPORT;
  static JWT_TOKEN_SECRET: string | undefined = process.env.JWT_TOKEN_SECRET;
  static JWT_TOKEN_ISSUER: string | undefined = process.env.JWT_TOKEN_ISSUER;
  static BASE_URL: string | undefined = process.env.BASE_URL;

  static get(name: string) {
    return process.env[name];
  }
}
