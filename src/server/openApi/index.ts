import { API_ROOT_PATH_VERSION_1 } from "../../shared/utils";
import { api } from "../api";

const remultOpenAPI = api.openApiDoc({ title: "Tech challenge", version: "v1" });

function addVersionToURI({remultOpenAPIPaths, versionPath}: {remultOpenAPIPaths: any, versionPath: string}) {
  const pathsObject : { [key: string]: any } = {};

  Object.keys(remultOpenAPIPaths).forEach((path) => {
    const pathWithVersion = !path.includes(versionPath) ? path?.replace("/api", versionPath) : "";
    return pathsObject[pathWithVersion || path] = remultOpenAPI.paths[path];
  })

  return pathsObject;
}

const pathsWithVersion = addVersionToURI({ remultOpenAPIPaths: remultOpenAPI.paths, versionPath: API_ROOT_PATH_VERSION_1});

export const openApiDocument = {
  ...remultOpenAPI,
  paths: {
    ...pathsWithVersion,
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
