import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { ThemeCustom } from "@/config/theme2";
import theme from "@/config/theme";

import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import useModalAll from "@/hooks/useModalAll";

import { useSubstituteLogic } from "@/hooks/useSubstituteLogic";

import HeaderEncrypted from "@/components/molecules/HeaderEncrypted/HeaderEncrypted";
import CardIcon from "@/components/molecules/CardIcon/CardIcon";
import IconSvg from "@/components/molecules/IconSvg/IconSvg";
import RadioButton from "@/components/molecules/RadioButton/RadioButton";
import AlertButton from "@/components/molecules/AlertButton/AlertButton";
import PhoneInput from "@/components/molecules/PhoneInput/PhoneInput";
import Button from "@/components/atoms/Button/Button";
import styles from "@/styles/SimStyles/SubstituteStyles";
import { balanceStyles } from "@/styles/BalanceStyles/BalanceStyles";

const Substitute = () => {
  const { t } = useTranslation();
  const { showModal } = useModalAll();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const baseMsg = "pages.substitute";

  const {
    substituteMode,
    currentSubstitute,
    isValid,
    alertSuccess,
    inputEditable,
    setInputEditable,
    handleSubstitutePhone,
    changeSubstitute,
    handleSubstituteMode,
  } = useSubstituteLogic();

  const [showHelperModal, setShowHelperModal] = useState(false);
  const handleModal = () => setShowHelperModal(!showHelperModal);

  const phoneInputValue = useMemo(() => {
    if (!currentSubstitute) return undefined;

    return {
      countryCode: currentSubstitute.countryCode ?? "",
      countryPhoneCode: currentSubstitute.countryPhoneCode ?? "",
      phoneNumber: currentSubstitute.phoneNumber ?? "",
    };
  }, [currentSubstitute]);

  const mockData = [
    {
      value: "dynamic",
      label: `${baseMsg}.dynamic.label`,
      description: `${baseMsg}.dynamic.description`,
    },
    {
      value: "manual",
      label: `${baseMsg}.manual.label`,
    },
  ];

  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <View
            style={[
              balanceStyles.container,
              {
                backgroundColor: isDark
                  ? '#000'
                  : '#F0FAFF',
              },
            ]}
          >
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContainer,
          themeMode !== ThemeMode.Dark && {
            backgroundColor: theme.lightMode.colors.white,
          },
        ]}
      >
        <HeaderEncrypted iconBack="HomeMain" title={t(`${baseMsg}.title`)} />

        <View style={styles.containerBody}>
          <View style={styles.cardIconContainer}>
            <CardIcon>
              <IconSvg
                color={theme.colors.iconDefault}
                height={50}
                width={50}
                type="multiplesettings"
              />
            </CardIcon>
          </View>

          <View style={styles.containerOptions}>
            {mockData.map((item, index) => (
              <RadioButton
                key={`${index}-${item.value}`}
                handleChange={(value: "manual" | "dynamic") => handleSubstituteMode(value, showModal)}
                handleBlur={() => {}}
                value={item.value}
                selectedValue={substituteMode}
                variant="voicefilter"
              >
                <View style={styles.radioLabelContainer}>
                  <Text allowFontScaling={false} style={styles.radioLabel}>
                    <Text
                      allowFontScaling={false}
                      style={
                        item.value === substituteMode
                          ? themeMode === ThemeMode.Dark
                            ? { color: theme.lightMode.colors.white }
                            : themeMode === ThemeMode.Light
                            ? { color: theme.lightMode.colors.blueDark }
                            : undefined
                          : undefined
                      }
                    >
                      {t(item.label)}
                    </Text>
                  </Text>
                  {item?.description && (
                    <Text
                      allowFontScaling={false}
                      style={styles.descriptionLabel}
                    >
                      {t(item.description)}
                    </Text>
                  )}
                </View>
              </RadioButton>
            ))}
          </View>

          {substituteMode === "manual" && (
            <View style={{ display: "flex", gap: 10 }}>
              <View style={styles.containerTitleSection}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.titleSection,
                    themeMode !== ThemeMode.Dark && {
                      color: theme.lightMode.colors.blueDark,
                    },
                  ]}
                >
                  {t(`${baseMsg}.titleCountry`)}
                </Text>
                <Pressable onPress={handleModal}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.titleLink,
                      themeMode !== ThemeMode.Dark && {
                        color: theme.lightMode.colors.blueDark,
                      },
                    ]}
                  >
                    {t(`helpMessages.howToWork`)}
                  </Text>
                </Pressable>
              </View>

              <PhoneInput
                countryCode={currentSubstitute?.countryCode ?? ""}
                countryPhoneCode={currentSubstitute?.countryPhoneCode ?? ""}
                phoneNumber={currentSubstitute?.phoneNumber ?? ""}
                onChange={handleSubstitutePhone}
                disabled={!inputEditable}
                styles={{
                  backgroundColor: isValid
                    ? theme.colors.inputStatusSuccessBG
                    : theme.colors.complementaryText,
                  borderColor: isValid
                    ? theme.colors.inputStatusSuccess
                    : theme.colors.borderInput,
                  color:
                    themeMode === ThemeMode.Dark
                      ? theme.colors.smootText
                      : "#222222",
                  backgroundColorModal:
                    themeMode === ThemeMode.Dark
                      ? theme.colors.complementaryText
                      : "white",
                }}
              />
            </View>
          )}

          <View style={styles.containerContentInformative}>
            <Text allowFontScaling={false} style={styles.informativeText}>
              {t(`${baseMsg}.${substituteMode}.tutorial`)}
            </Text>
          </View>

          {substituteMode === "manual" && (
            <>
              {alertSuccess && (
                <AlertButton
                  message={t(`${baseMsg}.manual.messageSuccess`)}
                  type="success"
                />
              )}
              {currentSubstitute?.phoneNumber && inputEditable && (
                <Button
                  variant="primaryPress"
                  onClick={() => {
                    setInputEditable(false);
                    changeSubstitute("manual");
                  }}
                  disabled={!isValid}
                >
                  {t(`actions.toActive`)}
                </Button>
              )}
              {currentSubstitute?.phoneNumber && !inputEditable && (
                <Button
                  onClick={() => setInputEditable(true)}
                  disabled={!isValid}
                >
                  {t(`actions.changeNumber`)}
                </Button>
              )}
            </>
          )}
        </View>
      </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Substitute;