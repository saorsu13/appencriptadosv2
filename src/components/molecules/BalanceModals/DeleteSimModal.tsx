import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { balanceStyles } from '@/styles/BalanceStyles/BalanceStyles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  simName?: string;
  isDeleting: boolean;
}

const DeleteSimModal: React.FC<Props> = ({
  visible,
  onClose,
  onDelete,
  simName,
  isDeleting,
}) => {
  const { t } = useTranslation();
  const { themeMode } = useDarkModeTheme();
  const isDarkMode = themeMode === ThemeMode.Dark;
  const baseMsg = 'pages.deleteSimModal';

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={balanceStyles.modalOverlay}>
        <View
          style={[
            balanceStyles.modalBox,
            { backgroundColor: isDarkMode ? '#000' : '#fff' },
          ]}
        >
          <IconSvg height={50} width={50} type="verificationiconfailed" />

          <Text style={[
              balanceStyles.modalTitle,
              {
                color: isDarkMode ? '#fff' : '#000',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10,
              },
            ]}>
            {`${t(`${baseMsg}.deleteTitle`)} ${simName}?`}
          </Text>

          <Text style={{
              color: isDarkMode ? '#aaa' : '#555',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 6,
            }}>
            {simName}
          </Text>

          {/* ——— Botón de borrar ——— */}
          <TouchableOpacity
            style={[
              balanceStyles.modalButton,
              {
                backgroundColor: '#D32F2F',
                marginTop: 20,
                opacity: isDeleting ? 0.6 : 1,
              },
            ]}
            onPress={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={balanceStyles.modalButtonText}>
                {t(`${baseMsg}.deleteSim`)}
              </Text>
            )}
          </TouchableOpacity>

          {/* ——— Botón de cancelar ——— */}
          <TouchableOpacity
            style={[
              balanceStyles.modalButton,
              {
                backgroundColor: isDarkMode ? '#444' : '#ccc',
                marginTop: 8,
                opacity: isDeleting ? 0.5 : 1,
              },
            ]}
            onPress={onClose}
            disabled={isDeleting}
          >
            <Text style={[
                balanceStyles.modalButtonText,
                { color: isDarkMode ? '#fff' : '#000' },
              ]}>
              {t(`${baseMsg}.cancel`)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteSimModal;