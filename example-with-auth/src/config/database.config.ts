import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  eventstoreDatabase: process.env.MYSQL_EVENTSTORE_DATABASE,
}));
