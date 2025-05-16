// src/components/molecules/CategoryPicker/CategoryPicker.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';

export interface CategoryPickerProps {
  options: string[];
  selected: string;
  placeholder?: string;
  onSelect: (value: string) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  options,
  selected,
  placeholder = 'Seleccionar',
  onSelect,
}) => {
  const { colors } = useTheme<ThemeCustomType>();
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Trigger con estilo de pill */}
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.trigger, { backgroundColor: colors.backgroundAlternate }]}
          onPress={() => setVisible(true)}
        >
          <Text style={[styles.triggerText, { color: colors.primaryText }]}>  
            {selected || placeholder}
          </Text>
          <AntDesign name="down" size={16} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Modal de opciones */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View style={[styles.modalBox, { backgroundColor: colors.backgroundAlternate }]}>  
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({ item }) => {
                const isActive = item === selected;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isActive && { backgroundColor: colors.backgroundSecondary },
                    ]}
                    onPress={() => {
                      onSelect(item);
                      setVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: isActive ? colors.primaryText : colors.secondaryText },
                      ]}
                    >
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
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    alignSelf: 'flex-end',
    marginRight:10,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  trigger: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: {
    fontSize: 13,
    fontWeight: 500,
    marginLeft: 8,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
  },
});

export default CategoryPicker;