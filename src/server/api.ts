import { remultExpress } from "remult/remult-express";
import { createPostgresConnection } from "remult/postgres";
import { User } from "../shared/User";
import { Account } from "../shared/Account";
import { Movement } from "../shared/Movement";
import { MovementController } from "../shared/MovementController";

export const api = remultExpress({
  dataProvider: createPostgresConnection({
    connectionString:
      process.env.DATABASE_URL || "postgres://postgres:test@localhost/remult",
  }),
  entities: [User, Account, Movement],
  controllers: [MovementController],
});
