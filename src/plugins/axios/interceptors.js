function setParams(config) {
  const params = config.params || {};
  config.params = Object.assign(params, {
    // метод assign позволяет склеить любое количество объектов
    apikey: process.env.VUE_APP_API_KEY,
    plot: "full",
  });

  return config;
}

export default function (axios) {
  axios.interceptors.request.use(setParams); // т.е. мы говорим, что axios использует для interceptor'а на запрос (request) такую-то функцию (use(setParams))
}
