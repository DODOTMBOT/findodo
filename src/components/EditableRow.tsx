'use client';

import React from "react";
import { Input } from "@heroui/react";
import DiffBadge from "./DiffBadge";
import { FinancialRowData } from "@/types/finance";

interface EditableRowProps {
  label: string;
  data: FinancialRowData;
  onChange: (val: string) => void;
  formatter: (val: number) => string;
}

export default function EditableRow({ label, data, onChange, formatter }: EditableRowProps) {
  const diff = data.fact - data.api;

  return (
    <div className="grid grid-cols-12 gap-2 items-center py-2 px-3 rounded-2xl hover:bg-default-50 transition-all duration-300">
      <div className="col-span-4">
        <span className="font-bold text-foreground text-sm">{label}</span>
      </div>
      
      <div className="col-span-3 text-right font-semibold text-default-400 text-xs">
        {formatter(data.api)}
      </div>

      <div className="col-span-3 flex justify-center">
        <Input
          type="number"
          variant="faded"
          placeholder="0"
          size="sm"
          onValueChange={onChange}
          classNames={{
            input: "text-center font-bold text-base text-primary",
            inputWrapper: "h-10 min-h-10 rounded-xl"
          }}
        />
      </div>

      <div className="col-span-2 text-right">
        <DiffBadge value={diff} />
      </div>
    </div>
  );
}