import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { api } from "./api";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { openApiDocument } from "./openApi";
import cors from "cors";
import { API_ROOT_PATH_VERSION_1 } from "../shared/utils";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { authRouter } from "./auth/auth.routes";
import { authenticateToken } from "./auth";
import { logInfo } from "./logger";

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());
app.use(express.json());

app.get(`${API_ROOT_PATH_VERSION_1}/openApi.json`, (req, res) =>
    res.json(openApiDocument),
);
app.use(
    `${API_ROOT_PATH_VERSION_1}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument),
);
app.use(authRouter);
app.use(logInfo);
app.use(authenticateToken);
app.use(api);
app.use(router);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(PORT, () => console.log("Server started, listening on:", PORT));
