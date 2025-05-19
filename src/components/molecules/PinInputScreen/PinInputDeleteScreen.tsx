// src/components/molecules/PinInputScreen/PinInputDeleteScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Dimensions,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustom } from '@/config/theme2';
import IconSvg from '../IconSvg/IconSvg';
import useModalAll from '@/hooks/useModalAll';
import useLocalPassword, { passwordKey } from '@/hooks/useLocalPassword';
import { useModalPassword } from '@/context/modalpasswordprovider';
import { useMenu } from '@/context/menuprovider';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksStoreRedux';
import { disablePasswordRequired } from '@/features/activePasswordRequired/activePasswordRequiredSlice';
import { deleteAllSims, deleteSim } from '@/features/sims/simSlice';
import { t } from 'i18next';
import { useAuth } from '@/context/auth';
import { resetModalUpdate } from '@/features/settingsSlice/settingsSlice';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { BalanceStackParamList } from '@/navigation/BalanceTypes';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const KEY_SIZE = Math.floor(SCREEN_WIDTH * 0.22); 

const MAX_ATTEMPTS = 5;

export default function PinInputDeleteScreen() {
  const { themeMode } = useDarkModeTheme();
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  const dispatch = useAppDispatch();
  const { signOut } = useAuth();
  const currentSim = useAppSelector(s => s.sims.currentSim);
  const { isMenuVisible, setIsMenuVisible } = useMenu();
  const { showModal } = useModalAll();
  const { closeModal } = useModalPassword();
  const { getPassword, deleteCurrentPassword } = useLocalPassword();

  const [pin, setPin] = useState('');
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [incorrectPasswordMessage, setIncorrectPasswordMessage] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const navigation = useNavigation<NavigationProp<BalanceStackParamList>>();

  // Ocultamos menú desplegable
  useEffect(() => {
    setIsMenuVisible(false);
  }, [setIsMenuVisible]);

  useEffect(() => {
    (async () => {
      const pwd = await getPassword(passwordKey);
      setCurrentPassword(pwd);
    })();
  }, [getPassword]);

  useEffect(() => {
    if (pin.length < 4) return;

    if (pin === currentPassword) {
      setIncorrectPasswordMessage(false);
      showModal({
        type: 'confirm',
        title: t('pages.home.confirmDeletePassword'),
        buttonColorConfirm: colors.primaryColor,
        buttonColorCancel: colors.danger,
        textConfirm: t('pages.home.confirm'),
        textCancel: t('pages.home.cancel'),
        onConfirm: () => {
          deleteCurrentPassword();
          dispatch(disablePasswordRequired());
          closeModal();
          navigation.navigate('BalanceSettings');
        },
        onCancel: () => {
          closeModal();
          navigation.navigate('BalanceSettings');
        },
      });
    } else {
      setIncorrectPasswordMessage(true);
      Vibration.vibrate(100);
      setPin('');
      setAttempts(a => a + 1);
    }
  }, [pin, currentPassword]);

  // Bloqueo después de varios intentos
  useEffect(() => {
    if (attempts < MAX_ATTEMPTS) return;
    signOut();
    dispatch(deleteAllSims());
    dispatch(deleteSim(currentSim));
    dispatch(disablePasswordRequired());
    deleteCurrentPassword();
    closeModal();
    navigation.navigate('BalanceMain');
    dispatch(resetModalUpdate(true));
  }, [attempts]);

  const handlePress = (digit: string) => {
    if (pin.length < 4) setPin(p => p + digit);
  };
  const handleBackspace = () => setPin(p => p.slice(0, -1));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <IconSvg
        type="userpassword"
        color={colors.primaryColor}
        style={styles.lockIcon}
      />

      <Text style={[styles.instructions, { color: colors.primaryText }]}>
        {t('pages.home.introducePasswordDevice')}
      </Text>

      <View style={styles.pinContainer}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.pinDot,
              {
                backgroundColor: pin[i]
                  ? colors.primaryColor                  // OK: primaryColor
                  : colors.strokeBorder                  // antes neutralMedium → ahora strokeBorder
              },
            ]}
          />
        ))}
      </View>

      {incorrectPasswordMessage && (
        <View style={styles.messageContainer}>
          <Text style={[styles.errorText, { color: colors.danger }]}>
            {t('pages.home.tryAgainPasswordTitle')}
          </Text>
          <Text style={[styles.errorText, { color: colors.danger }]}>
            {`${t('pages.home.youHave')} ${
              MAX_ATTEMPTS - attempts
            } ${t('pages.home.attempt')}`}
          </Text>
        </View>
      )}

      <View style={styles.keyboard}>
        {[1,2,3,4,5,6,7,8,9,'#',0].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.key,
              { backgroundColor: colors.backgroundSecondary } // antes neutralDark → ahora backgroundSecondary
            ]}
            onPress={() => handlePress(item.toString())}
          >
            <Text style={[styles.keyText, { color: colors.primaryText }]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.key,
            { backgroundColor: colors.backgroundSecondary } // mismo cambio aquí
          ]}
          onPress={handleBackspace}
        >
          <IconSvg type="erasetext" width={24} height={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  lockIcon: {
    marginBottom: 16,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 24,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
  },
  key: {
    width: KEY_SIZE,
    height: KEY_SIZE,
    borderRadius: KEY_SIZE / 2,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 24,
  },
});
