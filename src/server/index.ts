import express from "express";
import { api } from "./api";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { openApiDocument } from "./openApi";

const app = express();
app.use(api);
app.use(router);

app.get("/api/openApi.json", (req, res) => res.json(openApiDocument));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(3002, () => console.log("Server started, listening on 3002"));
