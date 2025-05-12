// src/components/molecules/ModalPayment/EditableDividerSection.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EditableDividerSectionProps {
  label: string;
  children: React.ReactNode;
}

const EditableDividerSection: React.FC<EditableDividerSectionProps> = ({
  label,
  children,
}) => {
 return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text allowFontScaling={false} style={styles.label}>
          {label}
        </Text>
        <View style={styles.valueContainer}>
          {children}
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 20,
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "400",
  },
  valueContainer: {
    maxWidth: "50%",
    alignItems: "flex-end",
  },
  divider: {
    borderWidth: 0.5,
    marginTop: 5,
    borderBottomColor: "#393939",
    width: "100%",
    marginBottom: 10,
  },
});

export default EditableDividerSection;
