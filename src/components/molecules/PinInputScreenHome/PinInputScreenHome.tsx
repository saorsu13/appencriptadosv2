// src/components/molecules/PinInputScreen/PinInputScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustom } from '@/config/theme2';
import { useDarkModeTheme } from '@/context/theme';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import useModalAll from '@/hooks/useModalAll';
import useLocalPassword, { passwordKey } from '@/hooks/useLocalPassword';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStoreRedux';
import {
  disablePasswordRequired,
  enablePasswordRequired,
} from '@/features/activePasswordRequired/activePasswordRequiredSlice';
import { useMenu } from '@/context/menuprovider';
import { deleteAllSims, deleteSim } from '@/features/sims/simSlice';
import { useModalPassword } from '@/context/modalpasswordprovider';
import { useAuth } from '@/context/auth';
import { t } from 'i18next';
import { resetModalUpdate } from '@/features/settingsSlice/settingsSlice';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

const MAX_ATTEMPTS = 5;

export default function PinInputScreen() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const backgroundColor = theme.colors.background;
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [verifyActualPassword, setVerifyActualPassword] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [actualPassword, setActualPassword] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const currentSim = useAppSelector((state) => state.sims.currentSim);
  const [incorrectPasswordMessage, setIncorrectPasswordMessage] =
    useState(false);

  const { closeModal } = useModalPassword();
  const { token, signOut, forceLogout } = useAuth();
  const isLoggedIn = !!token;
  const { savePassword, getPassword, deleteCurrentPassword } =
    useLocalPassword();
  const { showModal } = useModalAll();
  const dispatch = useAppDispatch();
  const { isMenuVisible, setIsMenuVisible } = useMenu();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SettingsMain'>>();

  // Load existing password
  useEffect(() => {
    async function fetchPassword() {
      const current = await getPassword(passwordKey);
      setActualPassword(current);
      if (!current) setIsVerifying(false);
    }
    fetchPassword();
  }, [getPassword]);

  // Hide menu
  useEffect(() => {
    setIsMenuVisible(false);
  }, []);

  // Check PIN logic
  const checkPin = () => {
    if (isVerifying && verifyActualPassword.length === 4) {
      if (actualPassword && verifyActualPassword === actualPassword) {
        setIsVerifying(false);
      } else if (actualPassword) {
        setAttempts((p) => p + 1);
        setIncorrectPasswordMessage(true);
        Vibration.vibrate(100);
        setPin('');
        setVerifyActualPassword('');
        if (attempts + 1 >= MAX_ATTEMPTS) {
          signOut();
          dispatch(deleteAllSims());
          dispatch(deleteSim(currentSim));
          dispatch(disablePasswordRequired());
          deleteCurrentPassword();
          closeModal();
          nav.goBack();
          dispatch(resetModalUpdate(true));
        }
      } else {
        setIsVerifying(false);
      }
    } else if (pin.length === 4 && !isConfirming && !isVerifying) {
      setIsConfirming(true);
    } else if (confirmPin.length === 4 && isConfirming) {
      if (pin === confirmPin) {
        if (!isConfirmed) {
          showModal({
            type: 'alert',
            buttonColorConfirm: colors.primaryColor,
            buttonColorCancel: colors.danger,
            textConfirm: t('pages.home.confirm'),
            textCancel: t('pages.home.cancel'),
            title: t('pages.home.confirmNewPassword'),
            onConfirm: () => {
              savePassword(confirmPin);
              setIsConfirmed(true);
              dispatch(enablePasswordRequired());
              nav.navigate('AccessPassword');
            },
            onCancel: () => {
              setPin('');
              setConfirmPin('');
              setIsConfirming(false);
              nav.navigate('AccessPassword');
            },
          });
        }
      } else {
        showModal({
          type: 'alert',
          buttonColorConfirm: colors.primaryColor,
          buttonColorCancel: colors.danger,
          textConfirm: t('pages.home.tryAgain'),
          textCancel: t('pages.home.backToPasswords'),
          title: t('pages.home.passwordDontMatch'),
          onConfirm: () => {
            setPin('');
            setConfirmPin('');
            setIsConfirming(false);
          },
          onCancel: () => {
            nav.navigate('AccessPassword');
          },
        });
      }
    }
  };

  useEffect(checkPin, [
    verifyActualPassword,
    pin,
    confirmPin,
    actualPassword,
    isConfirming,
    isVerifying,
    isConfirmed,
    attempts,
  ]);

  const handlePress = (digit: string) => {
    setIncorrectPasswordMessage(false);
    if (isVerifying) {
      if (verifyActualPassword.length < 4) {
        setVerifyActualPassword((v) => v + digit);
      }
    } else if (isConfirming) {
      if (confirmPin.length < 4) {
        setConfirmPin((v) => v + digit);
      }
    } else {
      if (pin.length < 4) {
        setPin((v) => v + digit);
      }
    }
  };

  const handleBackspace = () => {
    if (isVerifying) {
      setVerifyActualPassword((v) => v.slice(0, -1));
    } else if (isConfirming) {
      setConfirmPin((v) => v.slice(0, -1));
    } else {
      setPin((v) => v.slice(0, -1));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.lockIconContainer}>
        <IconSvg type="userpassword" />
      </View>
      <Text
        allowFontScaling={false}
        style={{ ...styles.instructions, color: colors.primaryText }}
      >
        {isVerifying
          ? t('pages.home.introduceActualPassword')
          : isConfirming
          ? t('pages.home.confirmPassword')
          : t('pages.home.introducePassword')}
      </Text>

      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((_, i) => (
          <View
            key={i}
            style={[
              styles.pinDot,
              {
                backgroundColor: isVerifying
                  ? verifyActualPassword[i]
                    ? colors.primaryColor
                    : 'gray'
                  : isConfirming
                  ? confirmPin[i]
                    ? colors.primaryColor
                    : 'gray'
                  : pin[i]
                  ? colors.primaryColor
                  : 'gray',
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.messageContainer}>
        {incorrectPasswordMessage && (
          <>
            <Text
              allowFontScaling={false}
              style={{ color: colors.danger, textAlign: 'center' }}
            >
              {t('pages.home.tryAgainPasswordTitle')}
            </Text>
            <Text
              allowFontScaling={false}
              style={{ color: colors.danger, textAlign: 'center' }}
            >
              {`${t('pages.home.youHave')} ${
                MAX_ATTEMPTS - attempts
              } ${t('pages.home.attempt')}`}
            </Text>
          </>
        )}
      </View>

      <View style={styles.keyboard}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '#', 0].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.key}
            onPress={() => handlePress(item.toString())}
          >
            <Text
              allowFontScaling={false}
              style={[styles.keyText, { color: colors.white }]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.key} onPress={handleBackspace}>
          <IconSvg
            color={colors.white}
            width={20}
            height={20}
            type="erasetext"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIconContainer: {
    marginBottom: 20,
  },
  instructions: {
    width: 220,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  pinDot: {
    width: 18,
    height: 18,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  messageContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'space-between',
  },
  key: {
    width: '26%',
    height: 79,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: "#fff", 
  },
  keyText: {
    fontSize: 24,
    padding: 15,
  },
});
