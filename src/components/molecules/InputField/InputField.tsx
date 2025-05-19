// src/components/molecules/InputField/InputField.tsx
import React, { forwardRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInputProps
} from "react-native";
import theme from "@/config/theme";
import { useDarkModeTheme } from "@/hooks/useDarkModeTheme";
import { FormikErrors } from "formik";

type Props = {
  label?: string;
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  error?: string | FormikErrors<any> | Array<string | FormikErrors<any>>;
  onChangeText: (text: string) => void;
  value: string;
  variant?: "default" | "light";
  required?: boolean;
  placeholder?: string;
  onBlur?: () => void;
  inputMode?: "text" | "numeric";
  maxLength?: number;
  editable?: boolean;
  status?: "success" | "info" | null;
  statusMessage?: string | null;
  onPressIcon?: () => void;
} & TextInputProps;

const InputField = forwardRef<TextInput, Props>((props, ref) => {
  const {
    label,
    onChangeText,
    value,
    error,
    suffixIcon,
    prefixIcon,
    variant = "default",
    required = false,
    placeholder,
    onBlur,
    inputMode = "text",
    maxLength,
    editable = true,
    status = null,
    statusMessage = null,
    onPressIcon,
    ...rest
  } = props;

  const { themeMode } = useDarkModeTheme();

  const handleChange = (txt: string) => {
    if (inputMode === "numeric") {
      onChangeText(txt.replace(/[^0-9]/g, ""));
    } else {
      onChangeText(txt);
    }
  };

  // Helper para sacar mensaje de un FormikErrors o array
  const getErrorMessage = () => {
    if (!error) return "";
    if (typeof error === "string") return error;
    if (Array.isArray(error)) return error[0] as string;
    // si es objeto de errores de Formik, toma el primer valor
    const vals = Object.values(error);
    return vals.length > 0 ? (vals[0] as string) : "";
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, variant === "light" && styles.lightLabel]}>
          {required && <Text style={styles.required}>*</Text>}
          {label}
        </Text>
      )}

      <View style={styles.inputWrap}>
        {prefixIcon && <View style={styles.prefix}>{prefixIcon}</View>}

        <TextInput
          ref={ref}
          style={[
            styles.inputBase,
            themeMode === "light" && styles.lightInput,
            {
              borderColor: error
                ? theme.colors.deleteBackground
                : status === "success"
                ? theme.colors.inputStatusSuccess
                : theme.colors.borderInput,
              backgroundColor:
                status === "success"
                  ? theme.colors.inputStatusSuccessBG
                  : theme.colors.complementaryText,
              paddingLeft: prefixIcon ? 50 : 14,
              paddingRight: suffixIcon ? 50 : 14,
              opacity: editable ? 1 : 0.5,
            },
          ]}
          onChangeText={handleChange}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={styles.placeholder.color}
          onBlur={onBlur}
          inputMode={inputMode}
          maxLength={maxLength}
          editable={editable}
          {...rest}
        />

        {suffixIcon && (
          <TouchableOpacity style={styles.suffix} onPress={onPressIcon}>
            {suffixIcon}
          </TouchableOpacity>
        )}
      </View>

      {/* Mensaje de error seguro para TS */}
      {error && (
        <Text style={styles.error}>
          {getErrorMessage()}
        </Text>
      )}

      {/* Mensajes de status */}
      {status === "success" && statusMessage && (
        <Text style={styles.success}>{statusMessage}</Text>
      )}
      {status === "info" && statusMessage && (
        <Text style={styles.info}>{statusMessage}</Text>
      )}
    </View>
  );
});

export default InputField;

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: {
    color: theme.colors.labelText,
    fontSize: 14,
    marginBottom: 4,
  },
  lightLabel: {
    color: theme.colors.textContrast,
  },
  required: {
    color: theme.colors.mainActionState,
  },
  inputWrap: {
    position: "relative",
  },
  inputBase: {
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 48,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.colors.smootText,
  },
  lightInput: {
    backgroundColor: "white",
    color: theme.colors.darkBlack,
  },
  placeholder: {
    color: theme.colors.labelText,
  },
  prefix: {
    position: "absolute",
    top: "30%",
    left: 12,
    zIndex: 1,
  },
  suffix: {
    position: "absolute",
    top: "30%",
    right: 12,
    zIndex: 1,
  },
  error: {
    color: theme.colors.deleteBackground,
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },
  success: {
    color: theme.colors.inputStatusSuccess,
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },
  info: {
    color: theme.colors.contrast,
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },
});