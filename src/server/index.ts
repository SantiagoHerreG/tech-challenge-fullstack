import express from "express";
import { api } from "./api";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { openApiDocument } from "./openApi";

const PORT = process.env.PORT || 3002;

const app = express();
app.use(api);
app.use(router);

app.get("/api/openApi.json", (req, res) => res.json(openApiDocument));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(express.static(process.cwd() + "/dist"));
app.listen(PORT, () => console.log("Server started, listening on:", PORT));
