// src/types/subscriber.ts

export interface Plan {
    name: string;
    pckdatabyte: string;
    useddatabyte: number;
    format: string;
  }
  
  export interface Provider {
    provider: string;
    iccid: string;
    imsi: string;
    balance: string;
    pack_mins: string;
    profile: string;
    voice: string;
    callerIdChange: string;
    country: string;
    type: string;
    plans: Plan[];
  }
  
  export interface SubscriberResponse {
    providers: Provider[];
  }
  