// src/components/organisms/HomeTab/PaymentsHome/PaymentsHome.tsx
import React, { JSX } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@shopify/restyle";
import { t } from "i18next";

import { ThemeCustom } from "@/config/theme2";
import { useDarkModeTheme } from "@/hooks/useDarkModeTheme";
import { ThemeMode } from "@/context/theme";

import Bancolombia from "./IconsPayments/Bancolombia";
import Visa from "./IconsPayments/Visa";
import VisaDark from "./IconsPayments/VisaDark";
import MasterCard from "./IconsPayments/MasterCard";
import PSE from "./IconsPayments/PSE";
import AmericanExpress from "./IconsPayments/AmericanExpress";
import Unknown from "./IconsPayments/Unknown";
import BitCoin from "./IconsPayments/BitCoin";
import TLogo from "./IconsPayments/TLogo";
import Piramid from "./IconsPayments/Piramid";
import MoneyBlue from "./IconsPayments/MoneyBlue";
import DLogo from "./IconsPayments/DLogo";
import LLogo from "./IconsPayments/LLogo";
import DHL from "./IconsPayments/DHL";

import { styles } from "./PaymentsHomeStyles";

interface IconData {
  component: JSX.Element;
  key: string;
}

const PaymentsHome: React.FC = () => {
    const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;

  const iconData: IconData[] = [
    { component: <Bancolombia height={50} width={50} />, key: "bancolombia" },
    {
      component:
        themeMode === ThemeMode.Dark
          ? <Visa height={50} width={50} />
          : <VisaDark height={50} width={50} />,
      key: "visa",
    },
    { component: <MasterCard height={50} width={50} />, key: "mastercard" },
    { component: <PSE height={50} width={50} />, key: "pse" },
    { component: <AmericanExpress height={50} width={50} />, key: "americanexpress" },
    { component: <Unknown height={50} width={50} />, key: "unknown" },
    { component: <BitCoin height={50} width={50} />, key: "bitcoin" },
    { component: <TLogo height={50} width={50} />, key: "tlogo" },
    { component: <Piramid height={50} width={50} />, key: "piramid" },
    { component: <MoneyBlue height={50} width={50} />, key: "moneyblue" },
    { component: <DLogo height={50} width={50} />, key: "dlogo" },
    { component: <LLogo height={50} width={50} />, key: "llogo" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text allowFontScaling={false} style={[styles.title, { color: colors.primaryText }]}>
        {t("pages.home-tab.paySecure")}
      </Text>

      <View style={styles.iconsContainer}>
        {chunkArray(iconData, 4).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <CenteredIcon key={item.key}>{item.component}</CenteredIcon>
            ))}
          </View>
        ))}
      </View>

      <Text
        allowFontScaling={false}
        style={[styles.title, { color: colors.primaryText, marginTop: 25 }]}
      >
        {t("pages.home-tab.shipping")}
      </Text>

      <View style={{ marginBottom: 40 }}>
        <DHL />
      </View>
    </View>
  );
};

const CenteredIcon: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <View style={styles.centeredIcon}>{children}</View>
);

const chunkArray = (array: any[], chunkSize: number) => {
  return Array(Math.ceil(array.length / chunkSize))
    .fill(undefined)
    .map((_, index) => index * chunkSize)
    .map((begin) => array.slice(begin, begin + chunkSize));
};

export default PaymentsHome;
