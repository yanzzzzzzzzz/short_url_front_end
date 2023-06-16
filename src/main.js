import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createStore } from 'vuex';
import store from './store';
// import store from './store';

library.add(faCopy, faTrash);
createApp(App)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app');
