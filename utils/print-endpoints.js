import listEndpoints from "express-list-endpoints";

export function logEndpoints(app) {
  const endpointsList = listEndpoints(app);

  for (let i = 0; i < endpointsList.length; i++) {
    console.log(
      `[${
        endpointsList[i].methods == "GET"
          ? `\x1b[32m${endpointsList[i].methods}\x1b[0m     `
          : `${
              endpointsList[i].methods == "POST"
                ? `\x1b[33m${endpointsList[i].methods}\x1b[0m    `
                : `${
                    endpointsList[i].methods == "PATCH"
                      ? `\x1b[90m${endpointsList[i].methods}\x1b[0m   `
                      : `${
                          endpointsList[i].methods == "DELETE"
                            ? `\x1b[31m${endpointsList[i].methods}\x1b[0m  `
                            : ""
                        }`
                  }`
            }`
      }] ${endpointsList[i].path} -- \x1b[2m${
        endpointsList[i].middlewares
      }\x1b[0m `
    );
  }
}

export default logEndpoints;
