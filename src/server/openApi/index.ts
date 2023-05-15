import { API_ROOT_PATH_VERSION_1 } from "../../shared/utils";
import { api } from "../api";

const remultOpenAPI = api.openApiDoc({ title: "Tech challenge", version: "v1" });
const pathsObject : { [key: string]: any } = {};

Object.keys(remultOpenAPI.paths).forEach((path) => {
  const pathWithVersion = !path.includes(API_ROOT_PATH_VERSION_1) ? path?.replace("api/", API_ROOT_PATH_VERSION_1) : "";
  return pathsObject[pathWithVersion || path] = remultOpenAPI.paths[path];
})

export const openApiDocument = {
  ...remultOpenAPI,
  paths: {
    ...pathsObject,
    // TODO: implement custom endpoints with the following example
    // "random-example": {
    //   get: {
    //     tags: ["Test custom route"],
    //     description: "Get users",
    //     operationId: "getUsers",
    //     parameters: [
    //       {
    //         name: "x-company-id",
    //         in: "header",
    //         schema: {
    //           $ref: "#/components/schemas/companyId",
    //         },
    //         required: true,
    //         description: "Company id where the users work",
    //       },
    //       {
    //         name: "page",
    //         in: "query",
    //         schema: {
    //           type: "integer",
    //           default: 1,
    //         },
    //         required: false,
    //       },
    //       {
    //         name: "orderBy",
    //         in: "query",
    //         schema: {
    //           type: "string",
    //           enum: ["asc", "desc"],
    //           default: "asc",
    //         },
    //         required: false,
    //       },
    //     ],
    //     responses: {
    //       "200": {
    //         description: "Users were obtained",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/Users",
    //             },
    //           },
    //         },
    //       },
    //       "400": {
    //         description: "Missing parameters",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/Error",
    //             },
    //             example: {
    //               message: "companyId is missing",
    //               internal_code: "missing_parameters",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  },
};
