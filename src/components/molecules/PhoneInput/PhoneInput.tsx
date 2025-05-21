import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "@/config/theme";
import IconSvg from "../IconSvg/IconSvg";
import { countriesPhone } from "@/constants/countries-all";

interface Props {
  countryCode: string;
  countryPhoneCode: string;
  phoneNumber: string;
  onChange: (value: {
    countryCode: string;
    countryPhoneCode: string;
    phoneNumber: string;
    success: boolean;
  }) => void;
  disabled?: boolean;
  rangeMin?: number;
  rangeMax?: number;
  styles?: {
    backgroundColor: string | null;
    borderColor: string | null;
    color: string | null;
    backgroundColorModal: string | null;
  };
}

const PhoneInput = ({
  countryCode,
  countryPhoneCode,
  phoneNumber,
  onChange,
  disabled = false,
  rangeMin = 7,
  rangeMax = 12,
  styles = {
    backgroundColor: null,
    borderColor: null,
    color: null,
    backgroundColorModal: null,
  },
}: Props) => {
  const editable = !disabled;
  const selectedValue = `${countryCode}-${countryPhoneCode}`;
  const success =
    phoneNumber.length >= rangeMin && phoneNumber.length <= rangeMax;

    const [open, setOpen] = useState(false);
  const [items, setItems] = useState(countriesPhone());
  const [value, setValue] = useState(selectedValue);

  const colors = {
    backgroundColor: styles.backgroundColor || theme.colors.complementaryText,
    borderColor: styles.borderColor || theme.colors.borderInput,
    color: styles.color || theme.colors.smootText,
    backgroundColorModal:
      styles.backgroundColorModal || theme.colors.darkBlack01,
  };

  const handleValue = (val: string) => {
    const [code, phoneCode] = val.split("-");
    onChange({
      countryCode: code,
      countryPhoneCode: phoneCode,
      phoneNumber,
      success,
    });
  };

  const handleNumber = (val: string) => {
    if (val.length <= rangeMax) {
      onChange({
        countryCode,
        countryPhoneCode,
        phoneNumber: val,
        success: val.length >= rangeMin && val.length <= rangeMax,
      });
    }
  };

  return (
    <View
      style={[
        stylesContainer.container,
        {
          borderColor: colors.borderColor,
          backgroundColor: colors.backgroundColor,
        },
      ]}
      aria-label="dropdown"
    >
      <View style={stylesContainer.pickerWrapper}>
      <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={(callback) => {
                const newVal = typeof callback === "function" ? callback(value) : callback;
                setValue(newVal);
                if (newVal) handleValue(newVal);
              }}
              items={items}
              setItems={setItems}
              placeholder=""
              style={[stylesContainer.picker, { backgroundColor: colors.backgroundColor }]}
              textStyle={!open ? { height: 0, color: 'transparent' } : stylesContainer.pickerItem}
              labelStyle={!open ? { display: 'none' } : stylesContainer.pickerItem}
              containerStyle={stylesContainer.pickerContainerItems}
              listMode="MODAL"
              modalProps={{ animationType: "fade" }}
              modalContentContainerStyle={{
                backgroundColor: colors.backgroundColorModal,
              }}
              CloseIconComponent={() => (
                <IconSvg
                  height={25}
                  type="closeicon"
                  width={25}
                  color={colors.color}
                />
              )}
              showArrowIcon={false}
              disabled={!editable}
              renderCustomizedButtonChild={() => {
                const selected = items.find((i) => i.value === value);
                return selected?.icon ? (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    {selected.icon()}
                  </View>
                ) : null;
              }}
            />

        <View style={stylesContainer.arrowIconWrapper}>
          <IconSvg
            height={25}
            width={25}
            type="arrowupicon"
            color={colors.color}
          />
        </View>
      </View>
      <View style={stylesContainer.simIconWrapper}>
        <IconSvg height={15} width={15} type="sim" color={colors.color} />
      </View>
      <TextInput
        value={phoneNumber}
        style={[
          stylesContainer.input,
          {
            color: colors.color,
            opacity: editable ? 1 : 0.5,
          },
        ]}
        inputMode="numeric"
        allowFontScaling={false}
        onChangeText={handleNumber}
        editable={editable}
        maxLength={12}
      />
    </View>
  );
};

export default PhoneInput;

const stylesContainer = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 0.5,
    height: 50,
    backgroundColor: theme.colors.darkBlack01,
    overflow: "hidden",
  },
  pickerWrapper: {
    width: 70,
    paddingLeft: 10,
    height: 40,
    justifyContent: "center",
    flexDirection: "row",
  },
  picker: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 8,
    ...theme.textVariants.select,
  },
  pickerItem: {
    color: theme.colors.selectText,
    ...theme.textVariants.select,
  },
  pickerContainerItems: {
    backgroundColor: theme.colors.darkBlack01,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 0,
    paddingVertical: 10,
    ...theme.textVariants.input,
    width: "60%",
  },
  arrowIconWrapper: {
    position: "absolute",
    top: 12,
    right: 5,
    zIndex: 1,
    pointerEvents: "none",
  },
  simIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
});
