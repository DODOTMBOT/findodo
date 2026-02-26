'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Input } from "@heroui/react";
import { useFinance } from '@/context/FinanceContext';
import { Plus, Trash2, KeyRound } from 'lucide-react';

export default function SettingsPage() {
  const { cashboxes, addCashbox, removeCashbox } = useFinance();
  const [newCashboxName, setNewCashboxName] = useState('');

  const handleAdd = () => {
    if (newCashboxName.trim()) {
      addCashbox(newCashboxName);
      setNewCashboxName('');
    }
  };

  // Исправленная функция авторизации (без URLSearchParams)
  const handleDodoAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_DODO_CLIENT_ID;
    
    // Строго как в админке Dodo IS
    const redirectUri = "https://localhost:5001";
    
    if (!clientId) {
      alert("Ошибка: Не указан NEXT_PUBLIC_DODO_CLIENT_ID в файле .env");
      return;
    }

    // Скоупы: добавлен offline_access для получения refresh_token
    const scopes = "offline_access deliverystatistics organizationstructure productionefficiency orders production products stockitems accounting stopsales staffshifts:read";
    
    // Собираем ссылку вручную. encodeURIComponent гарантирует правильное кодирование (пробелы станут %20)
    const authUrl = `https://auth.dodois.io/connect/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    
    // Перенаправляем пользователя
    window.location.href = authUrl;
  };

  return (
    <div className="p-4 md:p-8 font-sans text-slate-900 w-full max-w-[800px] mx-auto">
      <h1 className="text-3xl font-black mb-8">Настройки</h1>

      {/* Блок интеграции с API */}
      <Card className="rounded-[32px] border-none shadow-xl shadow-slate-200/50 p-4 bg-white mb-8 border border-orange-100">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <KeyRound className="text-orange-500" /> 
            Интеграция Dodo IS
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-slate-500 mb-6 text-sm">
            Подключите ваш аккаунт для возможности получения токена и автоматической выгрузки Z-отчетов.
          </p>
          <Button 
            className="h-14 px-8 rounded-2xl font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 w-fit"
            onClick={handleDodoAuth}
          >
            Авторизоваться в Dodo IS
          </Button>
        </CardBody>
      </Card>

      {/* Блок добавления касс */}
      <Card className="rounded-[32px] border-none shadow-xl shadow-slate-200/50 p-4 bg-white mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold">Добавить новую кассу</h2>
        </CardHeader>
        <CardBody className="flex flex-row gap-4 items-center">
          <Input 
            placeholder="Название кассы (например: Ресторан 2)" 
            value={newCashboxName}
            onValueChange={setNewCashboxName}
            className="flex-1"
            classNames={{ inputWrapper: "h-14 rounded-2xl" }}
          />
          <Button 
            color="primary" 
            className="h-14 px-8 rounded-2xl font-bold text-white shadow-lg shadow-blue-200"
            onClick={handleAdd}
            startContent={<Plus size={20} />}
          >
            Добавить
          </Button>
        </CardBody>
      </Card>

      {/* Блок списка активных касс */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-2">Активные кассы</h2>
        {cashboxes.map((cashbox, idx) => (
          <div key={cashbox.id} className="flex justify-between items-center bg-white p-6 rounded-[24px] shadow-sm">
            <div className="font-bold text-lg">
              <span className="text-slate-400 mr-2">#{idx + 1}</span> 
              {cashbox.name}
            </div>
            <Button 
              isIconOnly 
              color="danger" 
              variant="flat" 
              className="rounded-xl"
              onClick={() => removeCashbox(cashbox.id)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
        {cashboxes.length === 0 && (
          <p className="text-slate-400 text-center py-8">Нет активных касс. Добавьте первую!</p>
        )}
      </div>
    </div>
  );
}