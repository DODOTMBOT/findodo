'use client';

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useFinance } from "@/context/FinanceContext";

// Импорт новых компонентов
import { FinanceHeader } from "@/components/finance/FinanceHeader";
import { SummaryStats } from "@/components/finance/SummaryStats";
import { CashboxTabs } from "@/components/finance/CashboxTabs";
import CashboxCard from "@/components/CashboxCard";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { cashboxes } = useFinance(); 
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (cashboxes.length > 0 && !selectedId) {
      setSelectedId(cashboxes[0].id);
    }
  }, [cashboxes, selectedId]);

  if (!isMounted) return null;

  // ДИНАМИЧЕСКИЕ РАСЧЕТЫ ДЛЯ "КОШЕЛЬКОВ"
  const globalTotalFact = cashboxes.reduce((acc, cb) => 
    acc + cb.data.cash.fact + cb.data.site.fact + cb.data.terminal.fact, 0);

  // Для оправдания сервиса здесь можно добавить логику извлечения баланса сейфа из БД
  const mockSafeBalance = 60484; 
  const mockRestaurantBalance = 5824;

  const activeCashbox = cashboxes.find(cb => cb.id === selectedId);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#F4F6F8]">
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        <FinanceHeader date="25.02.2026" shift="2310" />

        <SummaryStats 
          totalRevenue={globalTotalFact} 
          safeBalance={mockSafeBalance} 
          restaurantCash={mockRestaurantBalance} 
        />

        <CashboxTabs 
          items={cashboxes} 
          selectedId={selectedId} 
          onSelect={setSelectedId} 
        />

        <div className="pb-10">
          {activeCashbox && (
            <motion.div 
              key={activeCashbox.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            >
              <CashboxCard 
                cashbox={activeCashbox} 
                index={cashboxes.indexOf(activeCashbox)} 
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}