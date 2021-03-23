import axios from "axios";

const instance = axios.create({
  // здесь находятся некие настройки для axios
  baseURL: process.env.VUE_APP_API_URL,
  params: {
    // query параметры, которые должны передаваться с каждым запросом
    apikey: process.env.VUE_APP_API_KEY,
    plot: "full", // для получения полнной информации о фильме
  },
});

export default instance;