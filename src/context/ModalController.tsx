// src/context/ModalController.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useModalContext } from './modal';

export default function ModalController() {
  const {
    modalVisible,
    modalTitle,
    modalDescription,
    textConfirm,
    textCancel,
    buttonColorConfirm,
    buttonColorCancel,
    oneButton,
    onConfirmAction,
    onCancelAction,
    hideModal,    // también disponible
  } = useModalContext();

  if (!modalVisible) return null;

  return (
    <Modal transparent animationType="fade" visible={modalVisible}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{modalTitle}</Text>
          <Text style={styles.description}>{modalDescription}</Text>

          <View style={styles.buttons}>
            {!oneButton && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: buttonColorCancel }]}
                onPress={() => {
                  onCancelAction();
                  hideModal();
                }}>
                <Text style={styles.buttonText}>{textCancel}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: buttonColorConfirm }]}
              onPress={() => {
                onConfirmAction();
                hideModal();
              }}>
              <Text style={styles.buttonText}>{textConfirm}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  container: {
    width: '80%', backgroundColor: 'white', borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 12,
  },
  description: {
    fontSize: 14, marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row', justifyContent: 'flex-end', gap: 8,
  },
  button: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4,
  },
  buttonText: {
    color: 'white', fontWeight: '600',
  },
});
