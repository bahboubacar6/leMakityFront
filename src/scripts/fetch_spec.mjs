import fetch from "node-fetch";
import fs from "fs/promises";

const options = {
  baseUrl: "http://localhost:8082/api",
  output: "api-docs.yaml",
};

/**
 * Download the OpenAPI spec file from the API
 * (it must be running when this script is executed!)
 * and save it to the file system
 */
async function downloadOpenApiSpec() {
  try {
    const response = await fetch(options.baseUrl + "/v3/api-docs.yaml");
    const data = await response.text();

    await fs.writeFile(options.output, data);
    console.log("Spécification OpenAPI de l'API téléchargée avec succès.");
  } catch (e) {
    console.error(e.message);
  }
}

downloadOpenApiSpec();
