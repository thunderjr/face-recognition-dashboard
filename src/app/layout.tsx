import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { AppConfigProvider } from "@/context/app-config-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard de Reconhecimento Facial",
  description: "Monitoramento de fluxo de pessoas por reconhecimento facial",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AppConfigProvider>{children}</AppConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
