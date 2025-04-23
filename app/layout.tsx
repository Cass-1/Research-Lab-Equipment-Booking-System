import type { Metadata } from "next";
import "./globals.css"
import AuthProvider from "@/app/_components/auth-provider";
import Navbar from "./_components/Navbar";
import SideNav from "./_components/sidenav";


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
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </AuthProvider>
        
      </body>
    </html>
  );
}
