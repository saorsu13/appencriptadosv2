import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import Label from '@/components/atoms/Label/Label';
import ButtonGroup from '@/components/molecules/ButtonGroup/ButtonGroup';
import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import ModalInfo from '@/components/molecules/ModalInfo/ModalInfo';
import { networkProfileStyles as styles } from './NetworkProfileStyles';
import { useAppSelector, useAppDispatch } from '@/hooks/hooksStoreRedux';
import { getSimNetworkProfiles } from '@/utils/getSimNetworkProfiles';
import { updateCurrentNetwork } from '@/features/networkProfile/networkProfileSlice';
import { SIM_TYPES } from '@/constants/networkProfiles';
import { determineSimType } from '@/utils/utils';
import { useNetworkProfile } from '@/features/networkProfile/useNetworkProfile';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/config/theme';
import { useTranslation } from 'react-i18next';

export default function NetworkProfile() {
  const { t } = useTranslation();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const [modalVisible, setModalVisible] = useState(false);
  const mutation = useNetworkProfile();
  const { colors } = useTheme<Theme>();

  const [cooldown, setCooldown] = useState(0);
  const [timerVisible, setTimerVisible] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const currentSim = useAppSelector(state => state.sims.currentSim);
  const currentNetwork = useAppSelector(state => state.networkProfile.networkProfile);
  const recommendedNetwork = useAppSelector(state => state.networkProfile.recommendedNetwork);

  
  console.log('[NetworkProfile] render');
  console.log('[NetworkProfile] currentSim:', currentSim);
  console.log('[NetworkProfile] currentNetwork:', currentNetwork);
  console.log('[NetworkProfile] recommendedNetwork:', recommendedNetwork);

  const simType = determineSimType(currentSim?.iccid ?? '') ?? SIM_TYPES.ELECTRONIC;
  const options = getSimNetworkProfiles(simType, currentNetwork);

  console.log('[NetworkProfile] simType:', simType);
  console.log('[NetworkProfile] options:', options);

  const [selected, setSelected] = useState(currentNetwork || 'r1');

  useEffect(() => {
        console.log('[NetworkProfile] useEffect -> currentNetwork changed:', currentNetwork);
    setSelected(currentNetwork);
  }, [currentNetwork]);

  const handleSelect = (val: string) => {
    console.log('[NetworkProfile] 🔔 handleSelect START, valor recibido:', val);
    if (!currentSim?.idSim){
      console.log('[NetworkProfile] ⚠️ SIM inválida, abortando.');
       return;
      }
    console.log('[NetworkProfile] 👉 Seteando estado local “selected” a:', val);

    setSelected(val);
        console.log('[NetworkProfile] dispatch(updateCurrentNetwork) con:', val);

    dispatch(updateCurrentNetwork(val));
    console.log('[NetworkProfile] mutation.mutate con:', {
      simId: currentSim.iccid,
      profile: val,
    });
    mutation.mutate({ simId: currentSim.iccid, profile: val });

    console.log('[NetworkProfile] Iniciando cooldown de 45s');

    setCooldown(45);
    setTimerVisible(true);
    setButtonsDisabled(true);
        console.log('[NetworkProfile] 🔔 handleSelect END');

  };

  useEffect(() => {
    if (cooldown <= 0) {
      setButtonsDisabled(false);
      setTimerVisible(false);
      return;
    }

    const timeout = setTimeout(() => {
      setCooldown(cooldown - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cooldown]);


  const infoIconColor = isDark
    ? colors.darkGray
    : colors.blueDark;

  return (
    <View style={[styles.container, !isDark && styles.containerLight]}>
      <View style={styles.header}>
        <Label
          fixWidth
          label={t('pages.home.networkProfile')}
          variant="strong"
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <IconSvg
            type="info"
            width={25}
            height={25}
            color={infoIconColor}
          />
        </TouchableOpacity>
      </View>

      <ButtonGroup
        options={options}
        defaultValue={selected}
        recommendedValue={recommendedNetwork}
        suggestText={t('helpMessages.recommended')}
        onValueChange={(val) => {
            console.log('[NetworkProfile] 🎯 onValueChange fired with:', val);
            handleSelect(val);
          }}
        disabled={buttonsDisabled}
      />


      {timerVisible && (
        <View style={styles.countdownContainer}>
          <Text style={[styles.countdownText, !isDark && styles.countdownTextLight]}>
            {t('pages.home.timeLeft')} 00:{cooldown.toString().padStart(2, '0')}
          </Text>
          <ProgressBar perecentage={(cooldown / 45) * 100} />
        </View>
      )}


      <ModalInfo
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={t('pages.home.profileHelp.title')}
        description={t('pages.home.profileHelp.message')}
        buttonText={t('pages.home.profileHelp.closeBtnText')}
      />
    </View>
  );
}
