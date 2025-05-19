// src/components/molecules/SimCountry/SimCountry.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import CurrencySelector from '@/components/molecules/CurrencySelector/CurrencySelector';
import countries from '@/constants/countries';
import CountryFlag from 'react-native-country-flag';
import { getStyles } from './SimCountryStyles';

type SimData = {
  id: string;
  name: string;
  number: string;      // ICCID
  provider: string;    // 'telco-vision' | 'tottoli'
};

type Props = {
  sims: SimData[];
  selectedSimId?: string;
  onSelectSim?: (id: string) => void;
  selectedCurrency?: string;
  onSelectCurrency?: (value: string) => void;
  onAddSim?: () => void;
  onEditSim?: (id: string) => void;
};

export default function SimCountry({
  sims,
  selectedSimId,
  onSelectSim,
  selectedCurrency,
  onSelectCurrency,
  onAddSim,
  onEditSim,
}: Props) {
  const [simModalVisible, setSimModalVisible] = useState(false);
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const styles = getStyles(isDark);
  const { t } = useTranslation();
  const base = 'pages.home';

  // Ordena SIMs: telco-vision primero
  const orderedSims = useMemo(
    () =>
      sims
        .slice()
        .sort((a, b) =>
          (a.provider === 'telco-vision' ? 0 : 1) -
          (b.provider === 'telco-vision' ? 0 : 1)
        ),
    [sims]
  );

  const selectedSim =
    orderedSims.find((s) => s.id === selectedSimId) || null;

  // Decide el icono del header
  const headerImage = selectedSim
    ? selectedSim.provider === 'telco-vision'
      ? require('@/assets/img/tim_icon_app_600px_negativo 1.png')
      : require('@/assets/img/adaptive-icon.png')
    : require('@/assets/img/adaptive-icon.png');

  return (
    <View style={styles.container}>
      {/** 🔹 Selector de SIM 🔹 **/}
      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>{t(`${base}.currentSim`)}</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setSimModalVisible(true)}
        >
          <View style={styles.selectorContent}>
            <View style={styles.simNameContainer}>
              <Text
                style={styles.selectorText}
                numberOfLines={1}
                ellipsizeMode="tail"
                {...(Platform.OS === 'android'
                  ? { adjustsFontSizeToFit: true, minimumFontScale: 0.9 }
                  : {})}
              >
                {selectedSim?.name ?? t('molecules.dropdown.placeholder')}
              </Text>
            </View>
            <Image source={headerImage} style={styles.icon} />
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color={isDark ? 'white' : 'gray'}
          />
        </TouchableOpacity>

        <Modal
          transparent
          visible={simModalVisible}
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setSimModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{t(`${base}.simList`)}</Text>

              <FlatList
                data={orderedSims}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  // Decide el icono de cada fila
                  const simImage =
                    item.provider === 'telco-vision'
                      ? require('@/assets/img/tim_icon_app_600px_negativo 1.png')
                      : require('@/assets/img/adaptive-icon.png');

                  // Puntos para ocultar los primeros caracteres
                  const dots = item.number.length > 6 ? '···' : '';


                  return (
                    <TouchableOpacity
                      style={styles.simItem}
                      onPress={() => {
                        onSelectSim?.(item.id);
                        setSimModalVisible(false);
                      }}
                    >
                      <View style={styles.simInfo}>
                        <View style={styles.simNameContainerModal}>
                          <Text
                            style={styles.simName}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.name}
                          </Text>
                        </View>
                        <Image
                          source={simImage}
                          style={[
                            styles.icon,
                            {
                              width: 25,
                              height: 25,
                              resizeMode: 'contain',
                              borderRadius: item.provider === 'tottoli' ? 6 : 4,
                            },
                          ]}
                        />
                        <Text style={styles.simNumber}>
                          {dots + item.number.slice(-6)}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setSimModalVisible(false);
                          onEditSim?.(item.id);
                        }}
                      >
                        <Ionicons
                          name="create-outline"
                          size={22}
                          color={isDark ? '#1E1E1E' : '#1E1E1E'}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                }}
              />

              <TouchableOpacity
                style={styles.addSimButton}
                onPress={() => {
                  setSimModalVisible(false);
                  onAddSim?.();
                }}
              >
                <Text style={styles.addSimText}>
                  + {t(`${base}.newSim`)}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/** 🔸 Selector de Moneda via CurrencySelector 🔸 **/}
      {selectedSim?.provider === 'tottoli' && (
        <View style={styles.selectorWrapper}>
          <CurrencySelector
            label={t('pages.home.currency')}
            selectedValue={selectedCurrency}
            onSelect={onSelectCurrency!}
          />
        </View>
      )}
    </View>
  );
}
