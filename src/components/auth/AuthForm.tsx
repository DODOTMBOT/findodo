'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Input, Tabs, Tab } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User } from "lucide-react";

export function AuthForm() {
  const { login } = useAuth();
  const [mode, setMode] = useState<any>("login");

  return (
    <Card className="w-full max-w-[420px] rounded-[32px] border-none shadow-2xl p-4 bg-white">
      <CardHeader className="flex flex-col gap-1 items-center pb-8">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-4">
          <Lock size={32} />
        </div>
        <h1 className="text-2xl font-black tracking-tight">FinDodo</h1>
        <p className="text-slate-400 text-sm font-medium">Войдите в кабинет партнера</p>
      </CardHeader>
      <CardBody>
        <Tabs 
          fullWidth 
          variant="light" 
          selectedKey={mode} 
          onSelectionChange={setMode}
          classNames={{ tabList: "bg-slate-50 p-1 rounded-2xl" }}
        >
          <Tab key="login" title="Вход">
            <div className="space-y-4 pt-6">
              <Input label="Email" placeholder="partner@dodo.io" variant="bordered" startContent={<Mail size={18} className="text-slate-400"/>} classNames={{ inputWrapper: "rounded-2xl h-14" }} />
              <Input label="Пароль" type="password" placeholder="••••••••" variant="bordered" startContent={<Lock size={18} className="text-slate-400"/>} classNames={{ inputWrapper: "rounded-2xl h-14" }} />
              <Button color="primary" className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 mt-4" onPress={login}>
                Войти
              </Button>
            </div>
          </Tab>
          <Tab key="register" title="Регистрация">
            <div className="space-y-4 pt-6">
              <Input label="Имя" placeholder="Иван" variant="bordered" startContent={<User size={18} className="text-slate-400"/>} classNames={{ inputWrapper: "rounded-2xl h-14" }} />
              <Input label="Email" placeholder="new@dodo.io" variant="bordered" startContent={<Mail size={18} className="text-slate-400"/>} classNames={{ inputWrapper: "rounded-2xl h-14" }} />
              <Button color="primary" className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 mt-4" onPress={login}>
                Создать аккаунт
              </Button>
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}