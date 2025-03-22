import type { Metadata } from "next";
import "./globals.css"
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "Research Equpment Checkout",
  description: "Our project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <SessionProvider >{children}</SessionProvider>
        
      </body>
    </html>
  );
}
