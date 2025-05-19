import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/config/theme';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useTranslation } from 'react-i18next';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { useAppSelector } from '@/hooks/hooksStoreRedux';
import ChangeImsiConfirmModal from '@/components/molecules/ChangeImsiModal/ChangeImsiModal';
import { useModalAll } from '@/context/modal';
import { simOptionsStyles as styles } from './SimOptionsStyles';
import { useNavigation } from '@react-navigation/native';
import { useChangeImsi } from '@/hooks/useChangeImsi'

interface SimOptionsProps {
  imsiChangesAvailable: number;
}

export default function SimOptions({ imsiChangesAvailable }: SimOptionsProps) {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = useTheme<Theme>();
  const { t } = useTranslation();
  const showModal = useModalAll().showModal;
  const currentSim = useAppSelector(s => s.sims.currentSim);
  const currentBalance = (useAppSelector(s => s.balance) || { balance: 0 }).balance;
  const navigation = useNavigation();
  const mutation = useChangeImsi()
  const [showImsi, setShowImsi] = useState(false);

  const bgColor = isDark
    ? theme.colors.darkBlack01
    : theme.colors.cyanSuperLight;
  const iconColor = isDark
    ? theme.colors.contrast
    : "#093448";
  // Text color based on theme
  const buttonTextColor = isDark ? '#CCCCCC' : '#093448';                      

  const imsiButtonColor = theme.colors.mainActionState;

  const options = [
    {
      label: t('pages.home.simOptions.voiceChange'),
      icon: <IconSvg color={iconColor} type="voicechange" height={35} width={35} />,
      route: 'VoiceFilter',
    },
    {
      label: t('pages.home.simOptions.settings'),
      icon: <IconSvg color={iconColor} type="multiplesettings" height={35} width={35} />,
      route: 'Substitute',
    },
    {
      label: t('pages.home.simOptions.callback'),
      icon: <IconSvg color={iconColor} type="callback" height={35} width={35} />,
      route: 'Callback',
    },
    {
      label: t('pages.home.simOptions.imsi'),
      icon: <IconSvg color={iconColor} type="change" height={35} width={35} />,
      isImsi: true,
    },
  ];
  

  const handleChangeImsi = (value) => {
    console.log('[SIMOPTIONS] handleChangeImsi: ', value);
    if (currentBalance.balance <= 0) {
      console.log('[SIMOPTIONS] Balance insuficiente');
      showModal({
        type: "alert",
        oneButton: true,
        title: t("pages.changeImsi.failed.title"),
        description: t("pages.changeImsi.failed.description"),
        textConfirm: t("actions.right"),
        buttonColorConfirm: "#10B4E7",
      });
      return;
    }
    console.log('[SIMOPTIONS] Abriendo modal IMSI con show =', value);

    setShowImsi(value);
  };

  const handleImsiSuccess = () => {
    console.log('[SIMOPTIONS] Cambio IMSI exitoso — mostrando modal de éxito');
    showModal({
      type: "confirm",
      oneButton: true,
      title: t("modalIMSI.successful"),
      description: t("modalIMSI.resetMobileIMSI"),
      textConfirm: t("actions.right"),
      buttonColorConfirm: "#10B4E7",
    });
  };
  
  const handleImsi = () => {
    console.log('[SIMOPTIONS] Usuario quiere cambiar IMSI');
    if (imsiChangesAvailable <= 0) {
      console.log('[SIMOPTIONS] No hay cambios IMSI disponibles');
      showModal({
        type: 'alert',
        oneButton: true,
        title: t('pages.changeImsi.failed.title'),
        description: t('pages.changeImsi.failed.description'),
        textConfirm: t('actions.right'),
        buttonColorConfirm: imsiButtonColor,
      });
      return;
    }
    console.log('[SIMOPTIONS] Mostrando modal de confirmación IMSI');
    setShowImsi(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.map(o => (
          <TouchableOpacity
            key={o.label}
            style={[ styles.item, { backgroundColor: bgColor } ]}
            onPress={() => {
              if (o.isImsi) {
                handleImsi();
              } else if (o.route) {
                navigation.navigate(o.route as never);
              }
            }}            
          >
            <View style={styles.iconWrapper}>
              {o.icon}
            </View>
            <Text
              allowFontScaling={false}
              style={[ styles.text, { color: buttonTextColor } ]}
            >
              {o.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ChangeImsiConfirmModal
        showChangeImsi={showImsi}
        handleClose={() => {
          console.log('[SIMOPTIONS] Cierre modal IMSI solicitado');
          setShowImsi(false);
        }}
        onSuccess={handleImsiSuccess}
      />
    </View>
  );
}
