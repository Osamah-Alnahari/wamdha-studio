// Shim file to satisfy relative import from amplify-cognito-config
// Re-export the generated Amplify configuration
// eslint-disable-next-line @typescript-eslint/no-var-requires
import config from "../src/aws-exports.js";
export default config;
export * from "../src/aws-exports.js";
