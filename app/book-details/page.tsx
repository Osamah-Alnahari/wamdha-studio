"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    // Use setTimeout to ensure this runs after the component has mounted
    const timer = setTimeout(() => {
      const url = new URL(window.location.href);
      if (url.searchParams.get("new") === "true") {
        router.replace("/books/new");
      } else {
        router.replace("/books");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-primary border-solid rounded-full animate-spin opacity-30"></div>
          <div className="absolute inset-2 border-4 border-primary border-dashed rounded-full animate-spin animate-reverse"></div>
          <div className="absolute inset-4 border-4 border-primary border-dotted rounded-full animate-spin animate-delay"></div>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Redirecting...</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Please wait while we redirect you to the correct page.
        </p>
      </div>
    </div>
  );
}
