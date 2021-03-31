function setParams(config) {
  const params = config.params || {};
  config.params = Object.assign(params, {
    // метод assign позволяет склеить любое количество объектов
    apikey: process.env.VUE_APP_API_KEY,
    plot: "full",
  });

  return config;
}

function returnData(res) {
  // сделали так, т.к. доступ через data неочень (если в перспективе будет необходимо сменить axios на что-либо другое, то поменяется то что будет отдаваться (так сказать, сегодня data есть, а завтра нет, не стоит к ней привязываться в своей бизнес-логике))
  return res.data;
}

export default function (axios) {
  axios.interceptors.request.use(setParams); // т.е. мы говорим, что axios использует для interceptor'а на запрос (request) такую-то функцию (use(setParams))
  axios.interceptors.response.use(returnData);
}
