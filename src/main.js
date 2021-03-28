import Vue from "vue";
import Router from "vue-router"
import App from "./App.vue";
import store from "./store";
import "./plugins/bootstrap";

Vue.config.productionTip = false;
Vue.use(Router)

const router = new Router({ // создали экземпляр класса router, который принимает объект с маршрутами, которые есть в нашем приложении
  mode: 'history', // сохраняем историю, чтобы возвращаться назад с ссылками вверху браузера
  base: process.env.BASE_URL,
  routes: [ // каждый маршрут указывается в виде объекта
    {
      path: "/",
      // name: "root", имя маршрута, необязательно
      component: App
    }
  ]
})



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
