// src/screens/Balance/EditSimEncrypted.tsx
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useRoute, RouteProp } from "@react-navigation/native";
import { useAppSelector } from "@/hooks/hooksStoreRedux";
import HeaderEncrypted from "@/components/molecules/HeaderEncrypted/HeaderEncrypted";
import InputField from "@/components/molecules/InputField/InputField";
import Button from "@/components/atoms/Button/Button";
import IconSvg from "@/components/molecules/IconSvg/IconSvg";
import { BalanceStackParamList } from "@/navigation/BalanceStackNavigator";
import { useEditSim } from "@/hooks/useEditSim";
import { useTheme } from "@shopify/restyle";
import { ThemeCustom } from "@/config/theme2";
import styles from "@/styles/BalanceStyles/EditSimEncryptedStyles";
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SimStackParamList } from '@/navigation/SimStackNavigator';
import { useSimManager } from '@/hooks/useSimManager';

// Define route prop type
type EditSimRouteProp = RouteProp<BalanceStackParamList, "EditSimEncrypted">;
type SimNavProp = NativeStackNavigationProp<SimStackParamList>;

const EditSimTottoli = () => {
  const { t } = useTranslation();
  const baseMsg = "pages.login.header";
  const route = useRoute<EditSimRouteProp>();
  const { idSim } = route.params;
  const { editSim } = useEditSim();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const navigation = useNavigation<SimNavProp>();
  const { changeSim } = useSimManager();

  const allSims = useAppSelector((state) => state.sims.sims);
  const simToEdit = allSims.find((sim) => sim.idSim === idSim);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      simName: simToEdit?.simName ?? simToEdit?.name ?? "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      simName: Yup.string()
        .required(t("validators.required"))
        .max(12, t("validators.invalidSim")),
    }),
    onSubmit: async (values) => {
      if (!simToEdit) return;
      setIsLoading(true);
      await editSim(simToEdit, values.simName);
      await changeSim({ ...simToEdit, simName: values.simName });
      setIsLoading(false);

      if (simToEdit.provider === 'tottoli') {
        navigation.navigate('SimsList');
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'RootTabs',
                state: {
                  index: 2,
                  routes: [
                    {
                      name: 'BalanceStack',
                      state: {
                        routes: [{ name: 'BalanceMain' }],
                      },
                    },
                  ],
                },
              },
            ],
          })
        );
      }
    }

  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor: isDark ? '#000' : '#F0FAFF' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <HeaderEncrypted owner="encriptados" iconBack="HomeMain" />
          {/* Banner */}
          <View style={styles.containerHeader}>
            <ImageBackground
              source={require("@/assets/img/new-sim-hero-edit.png")}
              resizeMode="cover"
              style={styles.imageBackground}
              imageStyle={styles.background}
            >
              <View style={styles.containerHeaderImage}>
                <Text style={styles.containerHeaderTitle} allowFontScaling={false}>
                  {t(`${baseMsg}.changeNameSimBanner`)}
                </Text>
              </View>
            </ImageBackground>
          </View>

          {/* Form */}
          <View style={styles.containerForm}>
            <View style={styles.containerFormFields}>
              <InputField
                label={t(`${baseMsg}.newNameOfYourSim`)}
                onChangeText={formik.handleChange("simName")}
                value={formik.values.simName}
                required
                placeholder={t(`${baseMsg}.placeholderSim`)}
                inputMode="text"
                maxLength={12}
                suffixIcon={
                  formik.values.simName.length > 0 ? (
                    <IconSvg width={20} height={20} type="confirmgreen" />
                  ) : null
                }
              />
            </View>
          </View>

          {/* Info text */}
          <Text allowFontScaling={false} style={styles.textInfo}>
            {t(`${baseMsg}.nameOfSimMax`)}
          </Text>

          {/* Submit button */}
          <View style={styles.bottomButtonContainer}>
            <Button
              disabled={!formik.values.simName}
              onClick={formik.handleSubmit}
              variant="primaryPress"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text allowFontScaling={false} style={styles.loadingButton}>
                  {t("pages.home.confirm")}
                </Text>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditSimTottoli;
