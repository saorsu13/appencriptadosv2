import api from "@/config/api";
import { SubstitutionData } from "@/hooks/useSubstituteLogic"; 


export const getSubstitutionNumber = async (id: string): Promise<SubstitutionData> => {
  try {
    const response = await api.get<SubstitutionData>(`getSubstitutionNumber`, { id });

    if (!response.data || !response.data.code_info) {
      throw new Error("Invalid response");
    }

    return response.data;
  } catch (error) {
    return {
      has_substitution_number: false,
      code_info: {
        country_code: "",
        country_phone_code: "",
        phone_number: "",
      },
      substitution_number_active: false,
    };
  }
};
