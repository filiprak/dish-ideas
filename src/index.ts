import { createApp } from 'vue';
import Index from './Index.vue';
import router from './router';

createApp(Index)
    .use(router)
    .mount('#app');
