import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { FinanceProvider } from "@/context/FinanceContext";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/components/providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = { title: "FinDodo" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} antialiased min-h-screen bg-[#F8FAFC]`}>
        <Providers>
          <AuthProvider>
            <FinanceProvider>
              <div className="flex min-h-screen">
                <Sidebar /> 
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </FinanceProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}