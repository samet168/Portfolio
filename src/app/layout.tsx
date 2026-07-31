import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/features/theme-provider";
import { LanguageProvider } from "@/features/language-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Moeun Samet - Full Stack Developer",
  description: "Portfolio of Moeun Samet, a Full Stack Developer specializing in building modern web applications with React, Next.js, and other cutting-edge technologies.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "Portfolio", "Moeun Samet"],
  authors: [{ name: "Moeun Samet" }],
  openGraph: {
    title: "Moeun Samet - Full Stack Developer",
    description: "Portfolio of Moeun Samet, a Full Stack Developer specializing in building modern web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}