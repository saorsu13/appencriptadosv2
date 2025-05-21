// src/screens/Home/Callback.tsx
import React, { useState, useCallback } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { useAppSelector, useAppDispatch } from '@/hooks/hooksStoreRedux'
import { updateCallback as updateCallbackAction } from '@/features/callback/callbackSlice'
import { useChangeCallback } from '@/features/callback/useCallback'
import useModalAll from '@/hooks/useModalAll'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import theme from '@/config/theme'

import HeaderEncrypted from '@/components/molecules/HeaderEncrypted/HeaderEncrypted'
import CardIcon from '@/components/molecules/CardIcon/CardIcon'
import IconSvg from '@/components/molecules/IconSvg/IconSvg'
import SwitchCard from '@/components/molecules/SwitchCard/SwitchCard'
import { balanceStyles } from '@/styles/BalanceStyles/BalanceStyles'
import { useGetSimBalance } from '@/features/simbalance/useGetSimBalance';


const baseMsg = 'pages.callback'

export default function Callback() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { showModal } = useModalAll()
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;

  const currentSim = useAppSelector(s => s.sims.currentSim)
  const currentCallback = useAppSelector(s => s.callback.callback)

  const [callback, setCallback] = useState(false)
  const [prevCallback, setPrevCallback] = useState(false)


  const simId = currentSim?.iccid ?? ''
  const currencyCode = currentSim?.currency?.split('-')[1] ?? ''
  const countryCode = currentSim?.currency?.split('-')[0] ?? ''

  const { data: simBalanceData } = useGetSimBalance(simId, currencyCode, countryCode)

  console.log("[Callback] Valor actual del backend:", simBalanceData?.callback);
  console.log("[Callback] Estado local:", callback);
  
  useFocusEffect(
    useCallback(() => {
      if (simBalanceData?.callback !== undefined) {
        const backendValue = simBalanceData.callback === "1";
        setCallback(backendValue);
        setPrevCallback(backendValue);
        dispatch(updateCallbackAction(backendValue));
      }
    }, [simBalanceData?.callback, dispatch])
  );
  
  const modalMessage = (enabled: boolean) =>
    enabled
      ? t('modalCallback.successful')
      : t('modalCallback.successfuldesactivate')

  const handleError = useCallback(() => {
    showModal({
      type: 'error',
      oneButton: true,
      title: t('type.error'),
      description: t('modalCallback.error'),
      textConfirm: t('actions.right'),
      buttonColorConfirm: '#CB0808',
    })
    setCallback(prevCallback)
  }, [prevCallback, showModal, t])

  const handleOnCompleted = useCallback(() => {
    dispatch(updateCallbackAction(callback))
    showModal({
      type: 'confirm',
      oneButton: true,
      title: t('modalCallback.title'),
      description: modalMessage(callback),
      textConfirm: t('actions.right'),
      buttonColorConfirm: '#10B4E7',
    })
  }, [callback, dispatch, modalMessage, showModal, t])

  const simIccid = currentSim?.iccid ?? ''
  const { refetch, isLoading } = useChangeCallback(
    simIccid,
    callback,
    handleError,
    handleOnCompleted
  )

  const onToggle = (value: boolean) => {
    setPrevCallback(callback)
    setCallback(value)
    refetch()
  }

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
      <HeaderEncrypted
        iconBack="HomeMain"      // nombre de la ruta raíz en tu HomeStack
        title={t(`${baseMsg}.title`)}
      />

      <View style={styles.containerBody}>
        <CardIcon>
          <IconSvg
            color={theme.colors.iconDefault}
            type="callback"
            width={50}
            height={50}
          />
        </CardIcon>

        <View
          style={[
            styles.descriptionCard,
            themeMode === ThemeMode.Light && {
              backgroundColor: theme.lightMode.colors.blueDark,
            },
          ]}
        >
          <Text style={styles.descriptionTitle}>
            {t(`${baseMsg}.callback`)}
          </Text>
          <Text style={styles.descriptionMessage}>
            {t(`${baseMsg}.callbackDescription`)}
          </Text>
        </View>

        {isLoading && <Text>{t('pages.common.loading')}…</Text>}

        <SwitchCard
          label={t(`${baseMsg}.callback`)}
          value={callback}
          defaultValue={callback}
          onChange={onToggle}
        />
      </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    marginTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  descriptionCard: {
    backgroundColor: theme.colors.mainBackground,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 20,
    gap: 15,
  },
  descriptionTitle: {
    color: theme.colors.listTitle,
    ...theme.textVariants.button,
  },
  descriptionMessage: {
    color: theme.colors.contentSummary,
    ...theme.textVariants.input,
  },
})
