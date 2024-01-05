import { createApp } from "vue";
import { createPinia } from "pinia";
import { lazyPlugin } from "./directives";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from "./App.vue";
import router from "./router";

//引入初始化的样式文件
import "@/styles/common.scss";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(lazyPlugin);
app.use(pinia);
app.use(router);

app.mount("#app");
