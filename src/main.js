import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n/i18n.js'

import axios from './plugins/axios';
import toast from './plugins/toast'
import './assets/main.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(axios);
app.use(toast);
app.use(i18n);

app.mount('#app')
