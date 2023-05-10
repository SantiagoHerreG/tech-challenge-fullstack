import express from "express";
import { api } from "./api";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(api);

const openApiDocument = api.openApiDoc({ title: "Tech challenge" });
const augmented = {
  ...openApiDocument,
  paths: {
    ...openApiDocument.paths,
    mypath: {
      get: {
        tags: ["CRUD operations"],
        description: "Get users",
        operationId: "getUsers",
        parameters: [
          {
            name: "x-company-id",
            in: "header",
            schema: {
              $ref: "#/components/schemas/companyId",
            },
            required: true,
            description: "Company id where the users work",
          },
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
            required: false,
          },
          {
            name: "orderBy",
            in: "query",
            schema: {
              type: "string",
              enum: ["asc", "desc"],
              default: "asc",
            },
            required: false,
          },
        ],
        responses: {
          "200": {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Users",
                },
              },
            },
          },
          "400": {
            description: "Missing parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "companyId is missing",
                  internal_code: "missing_parameters",
                },
              },
            },
          },
        },
      },
    },
  },
};
console.log(augmented);

app.get("/api/openApi.json", (req, res) => res.json(augmented));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(augmented));

app.listen(3002, () => console.log("Server started, listening on 3002"));
