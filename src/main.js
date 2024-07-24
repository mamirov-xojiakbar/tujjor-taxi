import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueTheMask from "vue-the-mask";
import {createPinia} from "pinia"
import i18n from "./plugins/i18n";


import router from "./router";
import VCalendar from "v-calendar";
import "v-calendar/style.css";


const settings={
    apiKey:"12091093-d99f-4896-9da2-665443cefca9",
    lang:"ru_RU",
    coordorder:"latlong",
    debug:false,
    version:"2.1",

}

const app = createApp(App);
app.use(VueTheMask);
const pinia= createPinia()

app.use(i18n);
app.use(VCalendar, {});
app.use(router);
app.use(pinia);
app.mount("#app");
