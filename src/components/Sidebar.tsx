'use client';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Home, Settings, PieChart } from "lucide-react";
import { Button } from "@heroui/react";

export default function Sidebar() {
  const { isLoggedIn, logout } = useAuth();

  // Это решит твою проблему: если не залогинен, сайдбара физически нет в DOM
  if (!isLoggedIn) return null;

  return (
    <aside className="w-72 border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0 p-8 shadow-sm z-50">
      <div className="font-black text-3xl mb-12 text-indigo-600 tracking-tighter">FinDodo</div>
      
      <nav className="flex flex-col gap-2 flex-1">
        <Link href="/" className="flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
          <Home size={20}/> Главная
        </Link>
        <Link href="/dashboard" className="flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
          <PieChart size={20}/> Аналитика
        </Link>
        <Link href="/settings" className="flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
          <Settings size={20}/> Настройки
        </Link>
      </nav>

      <Button 
        variant="flat" color="danger" 
        className="rounded-2xl font-bold mt-auto h-12"
        startContent={<LogOut size={18}/>}
        onPress={logout}
      >
        Выйти
      </Button>
    </aside>
  );
}