import { create } from "apisauce";

const ENCRIPTADOS_API_URL = "https://encriptados.io/wp-json/api/v1/";

const api = create({
  baseURL: ENCRIPTADOS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.addMonitor(response => {
  console.log('📡 API Request:', response.config?.url);
  console.log('📤 Payload:', response.config?.data);
  console.log('📥 Response:', response.data);
  if (response.problem) {
    console.error('❌ API Problem:', response.problem);
  }
});

export default api;
