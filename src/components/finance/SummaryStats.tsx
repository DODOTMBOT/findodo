import React from 'react';
import { Wallet, TrendingUp, Banknote } from "lucide-react";
import StatCard from "@/components/StatCard";

interface SummaryStatsProps {
  totalRevenue: number;
  safeBalance: number;
  restaurantCash: number;
}

export function SummaryStats({ totalRevenue, safeBalance, restaurantCash }: SummaryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Сейф — это ликвидность заведения */}
      <StatCard 
        title="Текущий баланс сейфа" 
        value={safeBalance} 
        icon={<Wallet size={20} />} 
        gradient="from-blue-600 to-indigo-700" 
      />
      {/* Выручка — эффективность всех точек продаж */}
      <StatCard 
        title="Выручка за сегодня" 
        value={totalRevenue} 
        icon={<TrendingUp size={20} />} 
        gradient="from-emerald-500 to-teal-700" 
      />
      {/* Касса — операционные деньги "в руках" */}
      <StatCard 
        title="Касса ресторана" 
        value={restaurantCash} 
        icon={<Banknote size={20} />} 
        gradient="from-violet-600 to-purple-800" 
      />
    </div>
  );
}