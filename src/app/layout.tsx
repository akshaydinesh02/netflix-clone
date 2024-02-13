import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "@/context";
import AuthProvider from "@/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OTT-Clone",
  description: "Watch unlimited movies, tv shows and more...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
