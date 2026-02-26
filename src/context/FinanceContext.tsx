'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CashboxConfig, DeliveryState } from '@/types/finance';

interface FinanceContextType {
  cashboxes: CashboxConfig[];
  addCashbox: (name: string) => void;
  removeCashbox: (id: string) => void;
  updateCashboxData: (id: string, key: keyof DeliveryState, value: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Дефолтная касса, если у пользователя вообще ничего не сохранено
const DEFAULT_CASHBOXES: CashboxConfig[] = [
  {
    id: '1',
    name: 'Доставка',
    data: {
      cash: { api: 1780, fact: 0 },
      site: { api: 61020, fact: 0 },
      terminal: { api: 0, fact: 0 }
    }
  }
];

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [cashboxes, setCashboxes] = useState<CashboxConfig[]>([]);
  // Флаг загрузки нужен, чтобы избежать ошибок гидратации в Next.js
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. При первой загрузке приложения достаем данные из localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('findodo_cashboxes');
    if (savedData) {
      try {
        setCashboxes(JSON.parse(savedData));
      } catch (error) {
        console.error("Ошибка при чтении из localStorage", error);
        setCashboxes(DEFAULT_CASHBOXES);
      }
    } else {
      setCashboxes(DEFAULT_CASHBOXES);
    }
    setIsLoaded(true);
  }, []);

  // 2. При любом изменении массива cashboxes сохраняем его в localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('findodo_cashboxes', JSON.stringify(cashboxes));
    }
  }, [cashboxes, isLoaded]);

  const addCashbox = (name: string) => {
    const newCashbox: CashboxConfig = {
      id: Date.now().toString(),
      name,
      data: {
        cash: { api: 0, fact: 0 },
        site: { api: 0, fact: 0 },
        terminal: { api: 0, fact: 0 }
      }
    };
    setCashboxes(prev => [...prev, newCashbox]);
  };

  const removeCashbox = (id: string) => {
    setCashboxes(prev => prev.filter(c => c.id !== id));
  };

  const updateCashboxData = (id: string, key: keyof DeliveryState, value: number) => {
    setCashboxes(prev => prev.map(cashbox => {
      if (cashbox.id === id) {
        return {
          ...cashbox,
          data: {
            ...cashbox.data,
            [key]: { ...cashbox.data[key], fact: value }
          }
        };
      }
      return cashbox;
    }));
  };

  // Пока данные не загрузились из локального хранилища, ничего не рендерим
  if (!isLoaded) {
    return null; 
  }

  return (
    <FinanceContext.Provider value={{ cashboxes, addCashbox, removeCashbox, updateCashboxData }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
};