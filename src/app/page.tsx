'use client';

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useFinance } from "@/context/FinanceContext";
import { useAuth } from "@/context/AuthContext";

import { FinanceHeader } from "@/components/finance/FinanceHeader";
import { SummaryStats } from "@/components/finance/SummaryStats";
import { CashboxTabs } from "@/components/finance/CashboxTabs";
import CashboxCard from "@/components/CashboxCard";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoggedIn } = useAuth();
  const { cashboxes } = useFinance(); 
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (cashboxes.length > 0 && !selectedId) {
      setSelectedId(cashboxes[0].id);
    }
  }, [cashboxes, selectedId]);

  if (!isMounted) return null;

  // Если не залогинен — только форма
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <AuthForm />
      </div>
    );
  }

  const globalTotalFact = cashboxes.reduce((acc, cb) => 
    acc + cb.data.cash.fact + cb.data.site.fact + cb.data.terminal.fact, 0);

  const activeCashbox = cashboxes.find(cb => cb.id === selectedId);
  // Находим индекс для передачи в CashboxCard
  const activeIndex = activeCashbox ? cashboxes.indexOf(activeCashbox) : 0;

  return (
    <div className="p-4 md:p-8 space-y-6">
      <FinanceHeader date="25.02.2026" shift="2310" />
      <SummaryStats totalRevenue={globalTotalFact} safeBalance={60484} restaurantCash={5824} />
      <CashboxTabs items={cashboxes} selectedId={selectedId} onSelect={setSelectedId} />

      <div className="pb-10">
        {activeCashbox && (
          <motion.div key={activeCashbox.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <CashboxCard 
              cashbox={activeCashbox} 
              index={activeIndex} // ПЕРЕДАЕМ ИНДЕКС ЗДЕСЬ
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}