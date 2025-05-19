// src/components/molecules/SimCurrencySelector/SimCurrencySelector.tsx
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
import { getStyles } from './simCurrencySelectorStyles';

type SimData = {
  id: string;
  name: string;
  logo: any;
  number: string;
  provider: string;
};

type Props = {
  sims: SimData[];
  selectedId?: string;
  onSelectSim?: (id: string) => void;
  onAddSim?: () => void;
  onEditSim?: (id: string) => void;
};

export default function SimCurrencySelector({
  sims,
  selectedId,
  onSelectSim,
  onAddSim,
  onEditSim,
}: Props) {
  const [simModalVisible, setSimModalVisible] = useState(false);
  const { themeMode } = useDarkModeTheme();
  const isDarkMode = themeMode === ThemeMode.Dark;
  const styles = getStyles(isDarkMode);
  const { t } = useTranslation();
  const baseMsg = 'pages.home';

  // Ordenar: telco-vision primero
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
    orderedSims.find(sim => sim.id === selectedId) || null;

  const getIconFor = (provider: string) => {
    return provider === 'telco-vision'
      ? require('@/assets/img/tim_icon_app_600px_negativo 1.png')
      : require('@/assets/img/adaptive-icon.png');
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>
          {t(`${baseMsg}.currentSim`)}
        </Text>
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
                {selectedSim?.name ??
                  t('molecules.dropdown.placeholder')}
              </Text>
            </View>
            <Image
              source={getIconFor(selectedSim?.provider ?? '')}
              style={styles.icon}
            />
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color={isDarkMode ? 'white' : 'gray'}
          />
        </TouchableOpacity>
      </View>

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
            <Text style={styles.modalTitle}>
              {t(`${baseMsg}.simList`)}
            </Text>

            <FlatList
              data={orderedSims}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
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
                        source={getIconFor(item.provider)}
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
                        color={isDarkMode ? 'black' : 'black'}
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
                {t(`${baseMsg}.newSim`)}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}