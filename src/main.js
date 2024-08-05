import { createApp } from 'vue';
import App from './App.vue';
import '/src/assets/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel'

createApp(App)
    .use(VueCollapsiblePanel)
    .mount('#app');
