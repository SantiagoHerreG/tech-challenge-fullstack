export function addVersionToURI({
    remultOpenAPIObject,
    versionPath,
}: {
    remultOpenAPIObject: any;
    versionPath: string;
}) {
    const pathsObject: { [key: string]: any } = {};

    Object.keys(remultOpenAPIObject.paths).forEach((path) => {
        const pathWithVersion = !path.includes(versionPath)
            ? path?.replace("/api", versionPath)
            : "";
        return (pathsObject[pathWithVersion || path] =
            remultOpenAPIObject.paths[path]);
    });

    return pathsObject;
}
