import { useCallback, useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { getSubstitutionNumber } from "@/api/substitute";
import { useChangeSubstitute } from "@/features/substitute/useChangeSubstitute";
import { useAppSelector } from "@/hooks/hooksStoreRedux";
import { setLoading } from "@/features/loading/loadingSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface SubstituteState {
  mode?: "dynamic" | "manual";
  countryCode: string | null;
  countryPhoneCode: string | null;
  phoneNumber: string | null;
}

interface CodeInfo {
  country_phone_code: string;
  country_code: string;
  phone_number: string | null;
}

export interface SubstitutionData {
  has_substitution_number: boolean;
  code_info: CodeInfo;
  substitution_number_active: boolean;
}

export const useSubstituteLogic = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [substituteMode, setSubstituteMode] = useState<"dynamic" | "manual" | undefined>();
  const [userChangedMode, setUserChangedMode] = useState(false);
  const [currentSubstitute, setCurrentSubstitute] = useState<SubstituteState | null>({
    mode: "dynamic",
    countryCode: "",
    countryPhoneCode: "",
    phoneNumber: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [inputEditable, setInputEditable] = useState(false);
  const [errorNumberManual, setErrorNumberManual] = useState(false);

  const queryClient = useQueryClient();
  const currentSim = useAppSelector((state) => state.sims.currentSim);
  const mutation = useChangeSubstitute();

  const { data, refetch } = useQuery<SubstitutionData | undefined>({
    queryKey: ["getSubstitutionNumber", currentSim?.iccid],
    queryFn: async () => {
      if (!currentSim?.iccid) return undefined;
      return await getSubstitutionNumber(currentSim.iccid);
    },
    enabled: !!currentSim?.iccid,
    staleTime: 0, // No lo consideres fresh nunca
    refetchOnMount: true, // Refresca siempre que entres
    refetchOnWindowFocus: false,
  });
  

  useEffect(() => {
    if (
      data &&
      data.code_info &&
      !userChangedMode
    ) {
      const { country_code, country_phone_code, phone_number } = data.code_info;
  
      console.log("📦 Restaurando número desde API:", data.code_info);
  
      setCurrentSubstitute({
        mode: substituteMode ?? "manual",
        countryCode: country_code,
        countryPhoneCode: country_phone_code,
        phoneNumber: phone_number,
      });
  
      if (phone_number) {
        const valid =
          phone_number.length >= 7 &&
          phone_number.length <= 12 &&
          country_code !== "0" &&
          country_phone_code !== "0";
        setIsValid(valid);
      }
    }
  }, [data]);  

  useEffect(() => {
    if (currentSubstitute?.phoneNumber) {
      const valid =
        currentSubstitute.phoneNumber.length >= 7 &&
        currentSubstitute.phoneNumber.length <= 12 &&
        currentSubstitute.countryPhoneCode !== "0" &&
        currentSubstitute.countryPhoneCode !== "" &&
        currentSubstitute.countryCode !== "0" &&
        currentSubstitute.countryCode !== "";
      setIsValid(valid);
      console.log("📞 Validación de número:", valid);
    }
  }, [currentSubstitute]);

  useEffect(() => {
    const loadStoredMode = async () => {
      const stored = await AsyncStorage.getItem('substituteMode');
      if (stored === 'manual' || stored === 'dynamic') {
        setSubstituteMode(stored);
      } else {
        setSubstituteMode("manual");
      }
    };
    loadStoredMode();
  }, []);
  
  useEffect(() => {
    if (substituteMode === 'manual' && !userChangedMode) {
      setInputEditable(true);
    }
  }, [substituteMode, userChangedMode]);

  useEffect(() => {
    if (
      data?.substitution_number_active &&
      data.code_info?.phone_number &&
      substituteMode === "manual" &&
      !userChangedMode
    ) {
      console.log("🔁 Restaurando vista post-activación");
      setInputEditable(false);        
      setAlertSuccess(true);         
    }
  }, [data, substituteMode, userChangedMode]);
  
  const handleSubstitutePhone = (obj: SubstituteState & { success: boolean }) => {
    if (
      currentSubstitute?.countryCode === obj.countryCode &&
      currentSubstitute?.countryPhoneCode === obj.countryPhoneCode &&
      currentSubstitute?.phoneNumber === obj.phoneNumber &&
      isValid === obj.success
    ) return;

    console.log("📲 handleSubstitutePhone ejecutado con:", obj);
    setCurrentSubstitute(obj);
    setIsValid(obj.success);
  };

  const changeSubstitute = async (type: "manual" | "dynamic") => {
    console.log("🚀 changeSubstitute llamado con:", type);
    dispatch(setLoading(true));
    setAlertSuccess(false);

    try {
      if (type === "manual" && currentSubstitute) {
        const response = await mutation.requestManual(
          currentSubstitute as Required<SubstituteState>,
          currentSim?.iccid ?? ""
        );

        if (!response.data || response.data.status !== "success") {
          setErrorNumberManual(true);
          return;
        }

        setAlertSuccess(true);
      } else {
        await mutation.requestDynamic(currentSim?.iccid ?? "");
      }
    } catch (error) {
      console.error("❌ Error en changeSubstitute:", error);
      setErrorNumberManual(true);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubstituteMode = async (value: "manual" | "dynamic", showModal: any) => {
    console.log("👉 handleSubstituteMode disparado:", value);
    setUserChangedMode(true);

    if (value === "dynamic") {
      showModal({
        type: "alert",
        title: t("pages.substitute.dynamic.label"),
        description: t("pages.substitute.dynamic.areYouSureDynamic"),
        textConfirm: t("actions.changeNow"),
        textCancel: t("actions.close"),
        buttonColorCancel: "#CB0808",
        buttonColorConfirm: "#10B4E7",
        onConfirm: async () => {
          const emptyValue: SubstituteState  = {
            countryCode: "0",
            countryPhoneCode: "0",
            mode: "dynamic",
            phoneNumber: "0",
          };
          await mutation.requestManual(
            emptyValue as Required<SubstituteState>, 
            currentSim?.iccid ?? "");
          await AsyncStorage.setItem('substituteMode', value);
          setSubstituteMode(value);
          setCurrentSubstitute(emptyValue);
          setInputEditable(true);
          setAlertSuccess(false);
        },
      });
    } else {
      console.log("✅ Cambiando a modo manual");
      await AsyncStorage.setItem('substituteMode', value);
      setSubstituteMode("manual");
    }
  };

  return {
    substituteMode,
    setSubstituteMode,
    userChangedMode,
    setUserChangedMode,
    currentSubstitute,
    setCurrentSubstitute,
    isValid,
    alertSuccess,
    setAlertSuccess,
    inputEditable,
    setInputEditable,
    errorNumberManual,
    setErrorNumberManual,
    mutation,
    data,
    refetch,
    currentSim,
    handleSubstitutePhone,
    changeSubstitute,
    handleSubstituteMode,
  };
};
