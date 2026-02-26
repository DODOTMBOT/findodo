import React from 'react';
import { Button, Chip } from "@heroui/react";
import { CalendarDays, Hash, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FinanceHeaderProps {
  date: string;
  shift: string;
}

export function FinanceHeader({ date, shift }: FinanceHeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-between items-center bg-white/80 backdrop-blur-md p-5 rounded-[28px] shadow-xl shadow-slate-200/50 border border-white"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <CalendarDays size={22} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Рабочая дата</p>
            <h1 className="text-xl font-black">{date}</h1>
          </div>
        </div>
        <div className="h-8 w-[2px] bg-slate-100 hidden md:block" />
        <Chip 
          startContent={<Hash size={14} />} 
          variant="flat" 
          className="px-3 py-1 font-black rounded-lg border-none text-sm bg-blue-50 text-blue-600"
        >
          Смена {shift}
        </Chip>
      </div>
      <Button 
        variant="light" 
        size="sm" 
        className="font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
      >
        Завершить смену
      </Button>
    </motion.header>
  );
}