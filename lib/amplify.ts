import { generateClient } from "aws-amplify/api";
import { amplifyConfigPromise } from "@/app/amplify-cognito-config";

let clientInstance: any = null;

export const clientPromise = amplifyConfigPromise
  .then(() => {
    console.log("Amplify configured successfully");
    if (!clientInstance) {
      clientInstance = generateClient();
    }
    return clientInstance;
  })
  .catch((error) => {
    console.error("Failed to configure Amplify:", error);
    throw error;
  });
