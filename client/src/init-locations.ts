import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useMainStore } from './main.store';
import { context } from '@shopware-ag/meteor-admin-sdk';

const app = createApp(App);
app.use(createPinia());

const main = useMainStore();
main.setApiContext({ ...(await context.getLanguage()) });
main.setContext(new URLSearchParams(document.location.search));
app.mount('#app');
