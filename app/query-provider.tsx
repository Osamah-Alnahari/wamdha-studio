"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

// Single shared QueryClient instance (lazy so Next hot reload doesn't duplicate too much)
let client: QueryClient | undefined;
function getClient() {
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          // Non-updating fields cache aggressively
          staleTime: 1000 * 60 * 60 * 24, // 24h considered fresh
          gcTime: 1000 * 60 * 60 * 72, // keep in cache 72h
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: 0,
        },
      },
    });
  }
  return client;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
