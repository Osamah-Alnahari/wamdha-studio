import { generateClient } from "aws-amplify/api";
import { amplifyConfigPromise } from "@/app/amplify-cognito-config";

// Initialize client after configuration is complete
let clientInstance: any = null;
let isInitialized = false;

// Configure Amplify and generate client
amplifyConfigPromise
  .then(() => {
    console.log("Amplify configured successfully");
    clientInstance = generateClient();
    isInitialized = true;
  })
  .catch((error) => {
    console.error("Failed to configure Amplify:", error);
  });

// Export the promise for async usage (used by the hook)
export const clientPromise = amplifyConfigPromise.then(() => {
  if (!clientInstance) {
    clientInstance = generateClient();
  }
  return clientInstance;
});
