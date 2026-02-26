import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { FinanceProvider } from "@/context/FinanceContext";

// Объявление шрифтов, которое потерялось
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinDodo",
  description: "Мое новое приложение",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-[#F0F2F5]`}>
        
        {/* Боковое меню */}
        <Sidebar />
        
        {/* Оборачиваем контент в FinanceProvider для доступа к кассам */}
        <FinanceProvider>
          <div className="flex-1 flex flex-col min-w-0">
            {children}
          </div>
        </FinanceProvider>
        
      </body>
    </html>
  );
}