"use client";

import { useAmplifyClient } from "@/hooks/use-amplify-client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { AmplifyErrorBoundaryProps } from "@/types";

export function AmplifyErrorBoundary({ children }: AmplifyErrorBoundaryProps) {
  const { error: clientError, isLoading: clientLoading } = useAmplifyClient();


  // Include a loading logo related to the website for better user experience
  // if (clientLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="relative w-16 h-16 mx-auto">
  //           <div className="absolute inset-0 border-4 border-primary border-solid rounded-full animate-spin opacity-30"></div>
  //           <div className="absolute inset-2 border-4 border-primary border-dashed rounded-full animate-spin animate-reverse"></div>
  //           <div className="absolute inset-4 border-4 border-primary border-dotted rounded-full animate-spin animate-delay"></div>
  //         </div>
  //         <h3 className="mt-4 text-lg font-semibold">Connecting to Server</h3>
  //         <p className="text-sm text-muted-foreground mt-2">
  //           Please wait while we establish a connection...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  if (clientError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold text-destructive mb-2">
            Connection Error
          </h2>
          <p className="text-muted-foreground mb-6">
            Failed to connect to the server. This might be due to network issues
            or server maintenance.
          </p>
          <div className="space-y-3">
            <Button onClick={() => window.location.reload()} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
            <p className="text-xs text-muted-foreground">
              If the problem persists, please try again later or contact
              support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
