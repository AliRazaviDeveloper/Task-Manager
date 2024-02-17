import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import StoreProvider from "@/providers/StoreProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description: "An application for managing tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-slate-100 ${inter.className}`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <Suspense fallback={<>Loading...</>}>
            <main className="container mx-auto">{children}</main>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
