// src/screens/Balance/BalanceSettings/AccessPassword.tsx

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustom } from '@/config/theme2';
import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import CustomSwitch from '@/components/atoms/Switch/CustomSwitch';
import ModalInfo from '@/components/molecules/ModalInfo/ModalInfo';
import useLocalPassword, { passwordKey } from '@/hooks/useLocalPassword';
import useModalAll from '@/hooks/useModalAll';
import { useMenu } from '@/context/menuprovider';
import { useAppSelector, useAppDispatch } from '@/hooks/hooksStoreRedux';
import { t } from 'i18next';
import { useAuth } from '@/context/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { BalanceStackParamList } from '@/navigation/BalanceTypes';
import { balanceStyles } from '@/styles/BalanceStyles/BalanceStyles';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';

export default function AccessPassword() {
  const { colors } = useTheme<ThemeCustom>();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;

  const navigation = useNavigation<NavigationProp<BalanceStackParamList>>();
  const { getPassword } = useLocalPassword();

  const [password, setPassword] = useState<string | null>(null);
  const activePass = useAppSelector(s => s.activePasswordRequired.isActive);
  const dispatch = useAppDispatch();
  const { showModal } = useModalAll();
  const { isMenuVisible, setIsMenuVisible } = useMenu();
  const { signOut } = useAuth();
  const currentSim = useAppSelector(s => s.sims.currentSim);

  const [orig, setOrig] = useState(activePass);
  const [temp, setTemp] = useState(activePass);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    setOrig(activePass);
    setTemp(activePass);
  }, [activePass]);

  useEffect(() => {
    setIsMenuVisible(false);
  }, [setIsMenuVisible]);

  useEffect(() => {
    (async () => {
      const pwd = await getPassword(passwordKey);
      setPassword(pwd);
    })();
  }, [getPassword]);

  const handleToggle = () => {
    const key = temp
      ? 'pages.home.modalDesactivatePasswordTitle'
      : 'pages.home.modalActivatePasswordTitle';

    showModal({
      type: 'confirm',
      title: t(key),
      buttonColorConfirm: colors.primaryColor,
      buttonColorCancel: colors.danger,
      textConfirm: t('pages.home.confirm'),
      textCancel: t('pages.home.cancel'),
      onConfirm: () => {
        if (temp) {
          navigation.navigate('DeleteAccessPassword');
          setTemp(orig);
        } else {
          navigation.navigate('CreateAccessPassword');
        }
      },
      onCancel: () => setTemp(orig),
    });
  };

  const onSwitch = (v: boolean) => {
    setTemp(v);
    handleToggle();
  };

  return (
    <View
      style={[
        balanceStyles.container,
        { backgroundColor: isDark ? '#000' : '#F0FAFF' },
      ]}
    >
      <HeaderEncrypted owner="encriptados" iconBack="BalanceSettings" />

      <View style={styles.container}>
        <ScrollView
          style={[styles.scrollView, { backgroundColor: colors.background }]}
        >
          <View
            style={[
              styles.contentContainer,
              { backgroundColor: colors.backgroundAlternate },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[styles.primaryText, { color: isDark ? '#fff' : '#000' }]}
            >
              {t('pages.home.titlerequiredpassword')}
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.secondaryText, { color: colors.secondaryText }]}
            >
              {t('pages.home.descriptionrequiredpassword')}
            </Text>
            <TouchableOpacity onPress={() => setInfoVisible(true)}>
              <Text
                allowFontScaling={false}
                style={[styles.underlineText, { color: isDark ? '#fff' : '#000' }]}
              >
                {t('helpMessages.howToWork')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchRow}>
            <Text
              allowFontScaling={false}
              style={{
                color: isDark ? '#fff' : 'gray',
                fontWeight: 'bold',
                fontSize: 14,
                width: 100,
              }}
            >
              {!password
                ? t('helpMessages.newPassword')
                : `${t('helpMessages.actualPassword')}: ${'*'.repeat(
                    password.length
                  )}`}
            </Text>
            <CustomSwitch value={temp} onChange={onSwitch} />
          </View>
        </ScrollView>
      </View>

      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primaryColor }]}
          onPress={() => navigation.navigate('CreateAccessPassword')}
        >
          <Text
            allowFontScaling={false}
            style={[styles.buttonText, { color: colors.white }]}
          >
            {!password
              ? t('helpMessages.configPassword')
              : t('helpMessages.changePassword')}
          </Text>
        </TouchableOpacity>

        <ModalInfo
          visible={infoVisible}
          onClose={() => setInfoVisible(false)}
          title={t('pages.home.profileWarning.title')}
          description={t('pages.home.howToReset')}
          buttonText={t('actions.close')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  contentContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  primaryText: { marginVertical: 10 },
  secondaryText: { marginVertical: 10 },
  underlineText: {
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: { padding: 10, alignItems: 'center' },
  button: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});