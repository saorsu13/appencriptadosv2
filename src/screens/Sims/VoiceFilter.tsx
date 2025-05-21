import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { useDispatch } from 'react-redux';

import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted';
import SoundsFilter from '@/components/organisms/SoundsFilter/SoundsFilter';
import CustomSwitch from '@/components/atoms/Switch/CustomSwitch';
import ModalInfo from '@/components/molecules/ModalInfo/ModalInfo';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';

import theme, { Theme } from '@/config/theme';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useAppSelector } from '@/hooks/hooksStoreRedux';
import useModalAll from '@/hooks/useModalAll';
import { setLoading } from '@/features/loading/loadingSlice';
import { updateVoice } from '@/features/voice/voiceSlice';
import { useChangeVoice } from '@/features/voice/useChangeVoice';
import { balanceStyles } from '@/styles/BalanceStyles/BalanceStyles';

const VoiceFilter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showModal } = useModalAll();
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const { colors } = useTheme<Theme>();

  const currentFilter = useAppSelector(state => state.voiceFilter);
  const currentSim = useAppSelector(state => state.sims.currentSim);
  const query = useChangeVoice();

  const [voiceFilter, setVoiceFilter] = useState(currentFilter.filter.toString());
  const [prevVoiceFilter, setPrevVoiceFilter] = useState(currentFilter.filter);
  const [disabled, setDisabled] = useState(true);
  const [showHelperModal, setShowHelperModal] = useState(false);

  const baseMsg = 'pages.voiceFilter';

  useFocusEffect(
    useCallback(() => {
      setVoiceFilter(currentFilter.filter.toString());
    }, [currentFilter.filter])
  );

  useEffect(() => {
    setDisabled(voiceFilter === '0');
  }, [voiceFilter]);

  useEffect(() => {
    const loadStoredFilter = async () => {
      const stored = await AsyncStorage.getItem('voiceFilter');
      if (stored) {
        setVoiceFilter(stored);
        dispatch(updateVoice(stored));
        setPrevVoiceFilter(Number(stored));
        setDisabled(stored === '0');
      }
    };
    loadStoredFilter();
  }, []);

  const handleVoiceFilter = async (value: string) => {
    try {
      dispatch(setLoading(true));
      await query.request(Number(currentSim?.iccid), Number(value));
      dispatch(updateVoice(value));
      setPrevVoiceFilter(Number(value));
      setVoiceFilter(value);
      await AsyncStorage.setItem('voiceFilter', value.toString());
    } catch (error) {
      showModal({
        type: 'error',
        oneButton: true,
        title: t('type.error'),
        description: t('modalVoiceFilter.error'),
        textConfirm: t('actions.right'),
        buttonColorConfirm: '#CB0808',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleToggle = () => {
    const newDisabled = !disabled;
    setDisabled(newDisabled);
    if (newDisabled) handleVoiceFilter('0');
  };

  return (
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
      <ScrollView>
      <HeaderEncrypted owner="encriptados" iconBack="HomeMain" />
        <View style={[styles.body, !isDark && { backgroundColor: theme.lightMode.colors.white }]}>
          <View style={[styles.descriptionCard, !isDark && { backgroundColor: theme.lightMode.colors.blueDark }]}>
            <IconSvg color={theme.colors.iconDefault} type="voicechange" height={40} width={40} />
            <Text style={[styles.title, !isDark && { color: theme.lightMode.colors.white }]}>
              {t(`${baseMsg}.description.title`)}
            </Text>
            <Text style={styles.message}>{t(`${baseMsg}.description.message`)}</Text>
            <Pressable onPress={() => setShowHelperModal(true)}>
              <Text style={styles.link}>{t('helpMessages.howToWork')}</Text>
            </Pressable>
          </View>

          <View style={styles.filterSection}>
            <View style={styles.headerRow}>
              <Text style={[styles.sectionTitle, !isDark && { color: theme.lightMode.colors.gray }]}>
                {t(`${baseMsg}.titleFilters`)}
              </Text>
              <View style={[styles.switchBox, !isDark && { backgroundColor: theme.lightMode.colors.blueDark }]}>
                <Text style={{ color: '#fff' }}>
                  {!disabled ? t(`${baseMsg}.enabled`) : t(`${baseMsg}.disabled`)}
                </Text>
                <View style={styles.scale}>
                  <CustomSwitch value={!disabled} onChange={handleToggle} />
                </View>
              </View>
            </View>

            <SoundsFilter
              voiceFilter={voiceFilter}
              handleVoiceFilter={handleVoiceFilter}
              disabled={disabled}
            />
          </View>
        </View>

        <ModalInfo
          visible={showHelperModal}
          onClose={() => setShowHelperModal(false)}
          title={t(`${baseMsg}.tutorial.title`)}
          description={t(`${baseMsg}.tutorial.message`)}
          buttonText={t(`${baseMsg}.tutorial.close`)}
          icon={<IconSvg type="filtericon" height={50} width={50} />}
        />
      </ScrollView>
    </View>
  );
};

export default VoiceFilter;

const styles = StyleSheet.create({
  body: {
    gap: 25,
    marginTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  descriptionCard: {
    backgroundColor: theme.colors.mainBackground,
    borderRadius: 8,
    gap: 15,
    padding: 20,
  },
  title: {
    color: theme.colors.listTitle,
    ...theme.textVariants.button,
  },
  message: {
    color: theme.colors.contentSummary,
    ...theme.textVariants.input,
  },
  link: {
    color: theme.colors.textLInk,
    borderBottomWidth: 0.3,
    borderBottomColor: theme.colors.textLInk,
    ...theme.textVariants.descriptionCard,
  },
  filterSection: {
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: theme.colors.textContrast,
    ...theme.textVariants.button,
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.mainBackground,
    padding: 8,
    borderRadius: 12,
  },
  scale: {
    transform: [{ scale: 0.75 }],
  },
});
