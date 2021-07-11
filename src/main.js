import { createApp } from 'vue';
import router from '@/router/index.js';
import store from '@/store/index.js';
import App from './App.vue';

import '@/css/tailwind.css';

const app = createApp(App);

app.use(router).use(store).mount('#app');
