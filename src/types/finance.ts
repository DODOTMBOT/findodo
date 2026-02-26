export interface FinancialRowData {
  api: number;
  fact: number;
}

export interface DeliveryState {
  cash: FinancialRowData;
  site: FinancialRowData;
  terminal: FinancialRowData;
}

// Новая структура для динамической кассы
export interface CashboxConfig {
  id: string;
  name: string;
  data: DeliveryState;
}