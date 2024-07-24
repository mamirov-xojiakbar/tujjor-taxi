import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueTheMask from "vue-the-mask";


import router from "./router";

const app = createApp(App);
app.use(VueTheMask);

app.use(router);
app.mount("#app");
