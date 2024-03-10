import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { lazyPlugin } from "./directives";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "./i18n/index";

import App from "./App.vue";
import router from "./router";
import VXETable from "vxe-table";

//引入初始化的样式文件
import "@/styles/common.scss";
import "vxe-table/lib/style.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(lazyPlugin);
app.use(pinia);
app.use(
	createI18n({
		locale: "zh",
		fallbackLocale: "en",
        messages:i18n
	})
);
app.use(router);
app.use(VXETable);

app.mount("#app");
