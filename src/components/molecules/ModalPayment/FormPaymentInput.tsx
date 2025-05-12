import React from "react";
import { TextInput, StyleSheet, DimensionValue  } from "react-native";

interface FormPaymentInputProps {
  placeholder: string;
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  value: string;
  width?: DimensionValue;
}

const FormPaymentInput: React.FC<FormPaymentInputProps> = ({
  placeholder,
  handleChange,
  handleBlur,
  value,
  width,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#656565"
      style={[styles.input, { width }]}
      onChangeText={handleChange}
      onBlur={handleBlur}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 33,
    borderWidth: 0.2,
    backgroundColor: "#202020",
    borderColor: "#CCCCCC",
    borderRadius: 3,
    paddingHorizontal: 12,
    color: "#fff",
  },
});

export default FormPaymentInput;
