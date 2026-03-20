import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type:"postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "shikha7275",
  database: "lms",
  synchronize: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/entities/migration/**/*.ts"],
  subscribers: ["src/entities/sunscriber/**/*.ts"],                                                     
})