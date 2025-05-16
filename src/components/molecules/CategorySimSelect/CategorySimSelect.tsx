// src/components/molecules/CategorySimModal.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { AntDesign } from '@expo/vector-icons';

interface CategorySimModalProps {
  selected: string;
  onChange: (value: string) => void;
}

const OPTIONS = ['SIM Encriptada', 'SIM TIM', 'SIM IRA'];

export default function CategorySimModal({ selected, onChange }: CategorySimModalProps) {
  const { colors } = useTheme<ThemeCustomType>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    onChange(OPTIONS[0]);
  }, []);

  return (
    <>
      {/* Botón que abre el modal */}
      <TouchableOpacity
        style={[styles.trigger, { backgroundColor: colors.backgroundSecondary }]}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: colors.primaryText, fontSize: 14, fontWeight: 700, }}>
          {selected}
        </Text>
        <AntDesign name="down" size={16} color={colors.primaryText} />
      </TouchableOpacity>

      {/* Modal personalizado */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View style={[styles.modalBox, { backgroundColor: colors.backgroundSecondary }]}>
            <FlatList
              data={OPTIONS}
              keyExtractor={item => item}
              renderItem={({ item }) => {
                const isActive = item === selected;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isActive && { backgroundColor: colors.backgroundAlternate }
                    ]}
                    onPress={() => {
                      onChange(item);
                      setVisible(false);
                    }}
                  >
                    <Text style={[
                      styles.optionText,
                      { color: isActive ? colors.white : colors.primaryText }
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 26,
    paddingHorizontal: 26,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',  // negro semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});