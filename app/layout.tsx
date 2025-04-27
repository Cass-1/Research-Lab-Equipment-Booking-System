import type { Metadata } from "next";
import "./globals.css"
import AuthProvider from "@/app/_components/auth-provider";


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

      <AuthProvider >
      {children}
      </AuthProvider>
      </body>
    </html>
  );
}
