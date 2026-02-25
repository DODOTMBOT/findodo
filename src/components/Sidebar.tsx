import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black flex flex-col h-screen sticky top-0 p-6">
      <div className="font-bold text-2xl mb-8 text-black dark:text-white">
        FinDodo
      </div>
      <nav className="flex flex-col gap-4 text-zinc-600 dark:text-zinc-400">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
          Главная
        </Link>
        <Link href="/dashboard" className="hover:text-black dark:hover:text-white transition-colors">
          Дашборд
        </Link>
        <Link href="/settings" className="hover:text-black dark:hover:text-white transition-colors">
          Настройки
        </Link>
      </nav>
    </aside>
  );
}