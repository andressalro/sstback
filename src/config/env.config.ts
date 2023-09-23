import "dotenv/config";

export default class EnvConfig {
  static NODE_ENV: string | undefined = process.env.NODE_ENV;
  static PORT: string | undefined = process.env.PORT;
  static MYSQL_NAME: string | undefined = process.env.MYSQL_NAME;
  static MYSQL_USER: string | undefined = process.env.MYSQL_USER;
  static MYSQL_PASS: string | undefined = process.env.MYSQL_PASS;
  static MYSQL_HOST: string | undefined = process.env.MYSQL_HOST;
  static MYSQL_PORT: string | undefined = process.env.MYSQL_PORT;

  static get(name: string) {
    return process.env[name];
  }
}
