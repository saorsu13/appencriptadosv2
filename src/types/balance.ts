export interface BalanceResponse {
    status: string;
    balance: number;
    balance_internet: number;
    balance_minutes: number;
    balance_imsi_changes: number;
    gb_availables: number;
    minutes_availables: number | string;
    imsi_changes_availables: number;
    currency_code: string;
  }
  
  export interface BalanceData {
    data: {
      gb_availables: number;
      minutes_availables: number;
      imsi_changes_availables: number;
    };
    balance: number;
    balance_internet: number;
    balance_minutes: number;
    balance_imsi_changes: number;
    currency_code: string;
  }
  