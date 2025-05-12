// src/components/molecules/ModalInfo/ModalInfo.tsx

import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Button from '@/components/atoms/Button/Button';
import Label from '@/components/atoms/Label/Label';
import theme from '@/config/theme';
import { useDarkModeTheme } from '@/hooks/useDarkModeTheme';
import { ThemeMode } from '@/context/theme';

interface ModalInfoProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText?: string;
  icon?: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get('window');
const MODAL_WIDTH = screenWidth - 40;

const ModalInfo: React.FC<ModalInfoProps> = ({
  visible,
  onClose,
  title,
  description,
  buttonText = 'Close',
  icon = null,
}) => {
  const { themeMode } = useDarkModeTheme();
  const isLight = themeMode === ThemeMode.Light;

  // Colores según modo
  const backgroundColor = isLight
    ? theme.colors.contrast
    : theme.colors.darkBlack01;
  const textColor = isLight
    ? theme.lightMode.colors.darkBlack
    : theme.lightMode.colors.white;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.wrapper, { width: MODAL_WIDTH }]}>
          <Pressable
            style={[styles.content, { backgroundColor }]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.header}>
              {icon}
              <Label
                label={title}
                variant="primary"
                // Aquí usamos el prop correcto que Label espera
                customStyles={[styles.label, { color: textColor }]}
              />
            </View>

            {/* Mensaje */}
            <Text style={[styles.message, { color: textColor }]}>
              {description}
            </Text>

            {/* Botón */}
            <Button
              // Tu Button atom usa `onClick`, no onPress
              onClick={onClose}
              variant={isLight ? 'primaryPress' : 'dark'}
            >
              <Text style={{ color: isLight ? '#FFF' : textColor }}>{buttonText}</Text>
            </Button>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalInfo;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    padding: 20,
  },
  content: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 0.5,
    borderColor: theme.colors.darkBlack05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    ...theme.textVariants.titleList,
    marginLeft: 12,
  },
  message: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 24,
  },
});