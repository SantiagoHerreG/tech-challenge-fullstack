import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { api } from "./api";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { openApiDocument } from "./openApi";
import cors from "cors";
import { API_ROOT_PATH_VERSION_1 } from "../shared/utils";

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());

app.use(api);
app.use(router);

app.get(`${API_ROOT_PATH_VERSION_1}/openApi.json`, (req, res) =>
    res.json(openApiDocument),
);
app.use(
    `${API_ROOT_PATH_VERSION_1}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument),
);

app.use(express.static(process.cwd() + "/dist"));
app.listen(PORT, () => console.log("Server started, listening on:", PORT));
