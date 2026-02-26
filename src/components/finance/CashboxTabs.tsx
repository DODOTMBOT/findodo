import React from 'react';
import { Button } from "@heroui/react";

interface Cashbox {
  id: string;
  name: string;
}

interface CashboxTabsProps {
  items: Cashbox[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CashboxTabs({ items, selectedId, onSelect }: CashboxTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {items.map((cb) => {
        const isActive = selectedId === cb.id;
        return (
          <Button
            key={cb.id}
            variant={isActive ? "solid" : "flat"}
            className={`h-12 px-6 rounded-2xl font-bold transition-all shrink-0 ${
              isActive
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
            onClick={() => onSelect(cb.id)}
          >
            {cb.name}
          </Button>
        );
      })}
    </div>
  );
}