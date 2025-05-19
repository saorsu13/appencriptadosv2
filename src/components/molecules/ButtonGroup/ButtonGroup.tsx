import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useModalAll } from '@/context/modal';
import { useTranslation } from 'react-i18next';
import { buttonGroupStyles as styles } from './ButtonGroupStyles';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options?: Option[]; 
  defaultValue?: string;
  recommendedValue?: string;
  suggestText?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

export default function ButtonGroup({
  options = [],
  defaultValue,
  recommendedValue,
  suggestText,
  onValueChange,
  disabled = false,
}: Props) {
  const { themeMode } = useDarkModeTheme();
  const isLight = themeMode === ThemeMode.Light;
  const { showModal } = useModalAll();
  const { t } = useTranslation();

  const [selected, setSelected] = useState(defaultValue || '');

  useEffect(() => {
    setSelected(defaultValue || '');
  }, [defaultValue]);

  const handlePress = (val: string) => {
    if (disabled) return;
    showModal({
      type: 'alert',
      title: t('pages.home.networkProfile'),
      description: t('pages.home.networkProfileDescription'),
      textConfirm: t('actions.changeNow'),
      textCancel: t('actions.close'),
      buttonColorCancel: '#CB0808',
      buttonColorConfirm: '#10B4E7',
      onConfirm: () => {
        setSelected(val);
        onValueChange?.(val);
      },
    });
  };

  return (
    <View style={styles.container}>
      {Array.isArray(options) &&
        options.map((opt) => {
          const isSelected = opt.value === selected;
          return (
            <View key={opt.value} style={styles.itemWrapper}>
              <TouchableOpacity
                style={[
                  styles.button,
                  isLight && styles.buttonLight,
                  isSelected &&
                    (isLight
                      ? styles.selectedLight
                      : styles.selectedDark),
                  disabled && styles.disabledButton,
                ]}
                onPress={() => handlePress(opt.value)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    // Light mode unselected text color override
                    isLight && !isSelected && { color: '#093448' },
                    // Selected text colors
                    isSelected
                      ? isLight
                        ? styles.selectedTextLight
                        : styles.selectedTextDark
                      : null,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>

              {opt.value === 'sg' && suggestText && (
                <View
                  style={[
                    styles.tag,
                    isLight && styles.tagLight,
                  ]}
                >
                  <Text style={styles.tagText}>{suggestText}</Text>
                </View>
              )}
            </View>
          );
        })}
    </View>
  );
}