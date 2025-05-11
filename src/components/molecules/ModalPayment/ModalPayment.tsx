import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemeMode } from "@/context/theme";
import { useDarkModeTheme } from "@/hooks/useDarkModeTheme";

type Props = {
  onClose?: () => void;
  visible?: boolean;
  children?: React.ReactNode;
};

const ModalPayment: React.FC<Props> = ({
  onClose = () => {},
  visible = false,
  children,
}) => {
  const { themeMode } = useDarkModeTheme();

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View
              style={
                themeMode === ThemeMode.Light
                  ? null
                  : { backgroundColor: "#141414" }
              }
            >
              {children}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalPayment;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    backgroundColor: "transparent",
    borderRadius: 24,
    alignItems: "center",
    elevation: 0,
    width: "100%",
  },
  modalContainer: {
    padding: 10,
    width: "100%",
  },
});
