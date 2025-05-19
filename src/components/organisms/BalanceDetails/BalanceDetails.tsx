import React, { useState, useMemo, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ModalInfo from '@/components/molecules/ModalInfo/ModalInfo';
import CardItem from '@/components/molecules/CardItem/CardItem';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { getStyles } from './BalanceDetailsStyles';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/config/theme';


type Props = {
  data?: {
    data?: {
      gb_availables?: number;
      minutes_availables?: number;
      imsi_changes_availables?: number;
    };
    balance?: number;
    balance_internet?: number;
    balance_minutes?: number;
    balance_imsi_changes?: number;
    currency_code?: string;
  };
};

export default function BalanceDetails({ data }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleInfoModal = () => setModalVisible(v => !v);
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const { colors } = useTheme<Theme>();
  const styles = getStyles(isDark, colors);
  const { t } = useTranslation();

  const simType = useMemo(() => {
    return data?.data?.imsi_changes_availables != null ? 'physical' : 'eSIM';
  }, [data]);

  const formatNumber = (value?: number | null) => {
    if (value == null) return '~';
    const intValue = Math.trunc(value); 
    return intValue.toLocaleString('en-US');
  };
  
  const infoIconColor = isDark
    ? colors.darkGray
    : colors.blueDark;

  return (
    <View style={styles.balanceContainer}>
      {/* Cabecera */}
      <View style={styles.balanceHeader}>
        <View style={styles.balanceHeaderLeft}>
          <Text style={styles.balanceLabel}>
            {t('pages.home.currentBalance')}
          </Text>
          <View style={styles.mainBalanceContainer}>
            <IconSvg type="wallet" height={25} width={25} />
            <Text style={styles.balanceValue}>
              {data?.balance != null
                ? `${formatNumber(data.balance)} ${data.currency_code}`
                : '~'}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleInfoModal}>
          <IconSvg
            type="info"
            width={25}
            height={25}
            color={infoIconColor}
          />
        </TouchableOpacity>
      </View>

      {/* Tarjetas de detalle */}
      <View style={styles.balanceContent}>
        <CardItem
          onClick={() => { }}
          icon={<IconSvg type="wifi" height={35} width={35} />}
          title={
            data?.data?.gb_availables != null
              ? `${data.data.gb_availables} GB`
              : '~'
          }
          message={t('organism.balanceDetails.mobileData')}
          caption={
            data?.balance_internet != null && data.currency_code
              ? `${formatNumber(data.balance_internet)} ${data.currency_code}`
              : '~'
          }
          style={{
            width: simType === 'physical' ? '30%' : '47%',
            minWidth: 100,
            maxWidth: 120,
            marginRight: simType === 'physical' ? 8 : 0,
          }}
          loading={false}
        />
        <CardItem
          onClick={() => { }}
          icon={<IconSvg type="phone" height={35} width={35} />}
          title={
            data?.data?.minutes_availables != null
              ? `${data.data.minutes_availables}`
              : '~'
          }
          message={t('organism.balanceDetails.minutes')}
          caption={
            data?.balance_minutes != null && data.currency_code
              ? `${formatNumber(data.balance_minutes)} ${data.currency_code}`
              : '~'
          }
          style={{
            width: simType === 'physical' ? '30%' : '47%',
            minWidth: 100,
            maxWidth: 120,
            marginRight: simType === 'physical' ? 8 : 0,
          }}
          loading={false}
        />
        {simType === 'physical' && (
          <CardItem
            onClick={() => { }}
            icon={<IconSvg type="safetyclock" height={35} width={35} />}
            title={
              data?.data?.imsi_changes_availables != null
                ? `${data.data.imsi_changes_availables}`
                : '~'
            }
            message={t('organism.balanceDetails.imsi')}
            caption={
              data?.balance_imsi_changes != null && data.currency_code
                ? `${formatNumber(data.balance_imsi_changes)} ${data.currency_code}`
                : '~'
            }
            style={{
              width: simType === 'physical' ? '30%' : '47%',
              minWidth: 100,
              maxWidth: 120,
            }}
            loading={false}
          />
        )}
      </View>

      <ModalInfo
        visible={modalVisible}
        onClose={handleInfoModal}
        title={t('organism.balanceDetails.helpMessages.title')}
        description={t('organism.balanceDetails.helpMessages.message')}
        buttonText={t('organism.balanceDetails.helpMessages.closeBtnText')}
      />
    </View>
  );
}
