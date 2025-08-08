import { useState, useEffect } from "react";
import { clientPromise } from "@/lib/amplify";

export function useAmplifyClient() {
  const [client, setClient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    clientPromise
      .then((amplifyClient) => {
        setClient(amplifyClient);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { client, isLoading, error };
}
