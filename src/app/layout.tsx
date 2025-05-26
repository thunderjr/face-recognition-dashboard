import "./globals.css";

import { Open_Sans as Font } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { AppConfigProvider } from "@/context/app-config-context";

const font = Font({ subsets: ["latin"] });

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
      <body className={font.className}>
        <ThemeProvider disableTransitionOnChange>
          <AppConfigProvider>{children}</AppConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
