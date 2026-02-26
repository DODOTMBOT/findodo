'use client';

import React from "react";
import { Card, CardHeader, CardBody, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import EditableRow from "./EditableRow";
import DiffBadge from "./DiffBadge";
import { CashboxConfig, DeliveryState } from "@/types/finance";
import { useFinance } from "@/context/FinanceContext";

interface Props {
  cashbox: CashboxConfig;
}

export default function CashboxCard({ cashbox }: Props) {
  const { updateCashboxData } = useFinance();

  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('ru-RU').format(val) + ' ₽';
  };

  const handleInputChange = (key: keyof DeliveryState, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateCashboxData(cashbox.id, key, numValue);
  };

  const totalApi = cashbox.data.cash.api + cashbox.data.site.api + cashbox.data.terminal.api;
  const totalFact = cashbox.data.cash.fact + cashbox.data.site.fact + cashbox.data.terminal.fact;
  const totalDiff = totalFact - totalApi;

  return (
    <Card className="rounded-[28px] border-none shadow-md bg-content1 flex flex-col h-full w-full">
      <CardHeader className="px-6 pt-6 pb-2">
        <h2 className="text-2xl font-black tracking-tight text-foreground">{cashbox.name}</h2>
      </CardHeader>

      <CardBody className="px-6 py-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="grid grid-cols-12 gap-2 mb-2 px-3 text-[10px] font-black text-default-400 uppercase tracking-widest">
            <div className="col-span-4">Тип оплаты</div>
            <div className="col-span-3 text-right">Dodo IS</div>
            <div className="col-span-3 text-center">Ввод</div>
            <div className="col-span-2 text-right">Разница</div>
          </div>

          <div className="space-y-1">
            <EditableRow label="Наличные" data={cashbox.data.cash} onChange={(val) => handleInputChange('cash', val)} formatter={formatCurrency} />
            <EditableRow label="Б/Н Сайт" data={cashbox.data.site} onChange={(val) => handleInputChange('site', val)} formatter={formatCurrency} />
            <EditableRow label="Б/Н Терминал" data={cashbox.data.terminal} onChange={(val) => handleInputChange('terminal', val)} formatter={formatCurrency} />
          </div>
        </div>

        <div>
          <div className="my-5 h-[1px] bg-default-100 w-full" />

          <div className="grid grid-cols-12 gap-2 items-center px-4 bg-default-50 p-4 rounded-2xl">
            <div className="col-span-4">
               <p className="text-xs font-black text-default-500 uppercase tracking-widest">Итог</p>
            </div>
            <div className="col-span-3 text-right font-bold text-default-400 text-sm">
              {formatCurrency(totalApi)}
            </div>
            <div className="col-span-3 text-center">
              <span className="text-xl font-black text-foreground">{formatCurrency(totalFact)}</span>
            </div>
            <div className="col-span-2 text-right">
              <DiffBadge value={totalDiff} />
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Dropdown placement="bottom-start" className="rounded-xl border-none">
              <DropdownTrigger>
                <Button variant="flat" className="h-12 px-4 rounded-xl font-bold flex-1">
                  Инкассация
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Action" className="p-2">
                <DropdownItem key="safe">В основной сейф</DropdownItem>
                <DropdownItem key="cashbox">В кассу ресторана</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="success" className="h-12 px-6 rounded-xl font-bold text-sm text-white flex-[2]">
              Подтвердить итоги
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}