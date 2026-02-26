'use client';

import { Chip } from "@heroui/react";

export default function DiffBadge({ value }: { value: number }) {
  if (value === 0) return <span className="text-default-300 font-bold">—</span>;
  
  const isNegative = value < 0;
  
  return (
    <Chip
      size="sm"
      color={isNegative ? "danger" : "warning"}
      variant="flat"
      className="font-black"
    >
      {isNegative ? '' : '+'}{value.toLocaleString('ru-RU')}
    </Chip>
  );
}