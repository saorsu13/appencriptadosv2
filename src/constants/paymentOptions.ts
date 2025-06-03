// src/constants/paymentOptions.ts
import CardMethodIcon from "@/components/molecules/ModalPayment/icons/CardMethodIcon";
import ATMIcon from "@/components/molecules/ModalPayment/icons/ATMIcon";
import BancolombiaMethodIcon from "@/components/molecules/ModalPayment/icons/BancolombiaMethodIcon";
import CryptoIcon from "@/components/molecules/ModalPayment/icons/CryptoIcon";

import { ComponentType } from "react";
import { ViewProps } from "react-native";


export const PAYMENTS_METHODS = {
  CREDIT_CARD: "pay_credit_card",
  ATM: "pay_atm",
  BANCOLOMBIA_PAY: "pay_bancolombia",
  CRYPTO: "pay_crypto",
};

export interface PaymentOptionItem {
  label: string;
  icon: ComponentType<ViewProps>;
  value: string;
}

export const paymentOptions = [
  {
    label: "modalPayment.methods.creditCard",
    icon: CardMethodIcon,
    value: PAYMENTS_METHODS.CREDIT_CARD,
  },
  {
    label: "modalPayment.methods.atm",
    icon: ATMIcon,
    value: PAYMENTS_METHODS.ATM,
  },
  {
    label: "modalPayment.methods.bancolombia",
    icon: BancolombiaMethodIcon,
    value: PAYMENTS_METHODS.BANCOLOMBIA_PAY,
  },
  {
    label: "modalPayment.methods.crypto",
    icon: CryptoIcon,
    value: PAYMENTS_METHODS.CRYPTO,
  },
];
