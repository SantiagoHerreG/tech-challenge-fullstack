import * as dotenv from "dotenv";
dotenv.config();
import { remultExpress } from "remult/remult-express";
import { createPostgresConnection } from "remult/postgres";
import { User, seed } from "../shared/User";
import { Account } from "../shared/Account";
import { Movement } from "../shared/Movement";
import { MovementController } from "../shared/MovementController";
import { API_ROOT_PATH_VERSION_1 } from "../shared/utils";

export const api = remultExpress({
    rootPath: API_ROOT_PATH_VERSION_1,
    dataProvider: createPostgresConnection({
        connectionString:
            process.env.DATABASE_URL ||
            "postgres://postgres:test@localhost/remult",
    }),
    entities: [User, Account, Movement],
    controllers: [MovementController],
    initApi: seed,
});
