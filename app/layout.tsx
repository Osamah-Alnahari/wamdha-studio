import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import "./amplify-cognito-config";
import { AuthProvider } from "@/contexts/AuthContext";
import { AmplifyErrorBoundary } from "@/components/amplify-error-boundary";
import "@aws-amplify/ui-react/styles.css";
import { APP_NAME } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME} - Your Digital Reading Companion`,
  description:
    "Transform your reading experience with AI-powered summaries and document analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AmplifyErrorBoundary>
            <AuthProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster position="top-right" richColors />
              </div>
            </AuthProvider>
          </AmplifyErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
