import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faTrash, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
const pinia = createPinia();

library.add(faCopy, faTrash, faLink);
createApp(App).use(pinia).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');
