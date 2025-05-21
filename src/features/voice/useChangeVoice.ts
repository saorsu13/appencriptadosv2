import api from "@/config/api";

async function changeVoice(id: number, voice: number): Promise<any> {
  try {
    const response = await api.post("/changeVoice", { id, voice });
    if (response.problem) {
      throw new Error(response.problem);
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
  
}

export function useChangeVoice() {
    const request = async (id: number, voice: number) => {
      const response = await changeVoice(id, voice);
      return { data: response.data };
    };
  
    return { request };
  }