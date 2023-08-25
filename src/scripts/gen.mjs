import $RefParser from "json-schema-ref-parser";
import { NgOpenApiGen } from "ng-openapi-gen";

const options = {
  input: "api-docs.yaml",
  output: "src/app/api",
};

/**
 * Generate Angular API module from the OpenAPI spec file
 */
async function generateAngularApiModule() {
  // load the openapi-spec and resolve all $refs
  const RefParser = new $RefParser();
  const openApi = await RefParser.bundle(options.input, {
    dereference: { circular: false },
  });

  const ngOpenGen = new NgOpenApiGen(openApi, options);
  ngOpenGen.generate();

  console.log("Module Angular généré avec succès.");
}

generateAngularApiModule();
