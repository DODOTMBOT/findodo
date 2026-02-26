'use client';

import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { History } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
}

export default function StatCard({ title, value, icon, gradient }: StatCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Card className={`rounded-[40px] bg-gradient-to-br ${gradient} text-white p-6 border-none shadow-2xl h-full`}>
        <CardBody className="py-2 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              {icon}
            </div>
            <History size={18} className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[2px] opacity-60 mb-2">{title}</p>
          <h3 className="text-3xl font-black tracking-tight">
            {new Intl.NumberFormat('ru-RU').format(value)} ₽
          </h3>
          <div className="mt-6">
             <Button size="sm" className="bg-white/20 text-white font-bold h-10 px-6 rounded-xl border-none hover:bg-white/30" variant="flat">
               Детали
             </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}