import api from "@/config/api";

type SubstitutePayload = {
  mode: string;
  countryCode: string | null;
  countryPhoneCode: string | null;
  phoneNumber: string | null;
};

async function updateSubstitute(numberSubstitution: SubstitutePayload, id: string): Promise<any> {
  const response = await api.post("/changeNumberSubstitution", {
    ...numberSubstitution,
    id,
  });

  return response;
}

async function updateDynamicSubstitute(id: string): Promise<any> {
  const response = await api.post("/changeNumberSubstitutionDinamyc", {
    id,
  });

  return response;
}

export function useChangeSubstitute() {
  const requestManual = async (numberSubstitution: SubstitutePayload, id: string) => {
    const response = await updateSubstitute(numberSubstitution, id);
    return { data: response.data };
  };

  const requestDynamic = async (id: string) => {
    const response = await updateDynamicSubstitute(id);
    return { data: response.data };
  };

  return { requestManual, requestDynamic };
}
