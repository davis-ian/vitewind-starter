import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axiosInstance from './services/axiosInstance';

// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBolt,
  faSackDollar,
  faGhost,
  faAngleRight,
  faAnglesRight,
  faAngleLeft,
  faAnglesLeft,
  faArrowDown,
  faArrowUp,
  faArrowDownUpAcrossLine
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBolt,
  faSackDollar,
  faGhost,
  faAngleRight,
  faAnglesRight,
  faAngleLeft,
  faAnglesLeft,
  faArrowDown,
  faArrowUp,
  faArrowDownUpAcrossLine
);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount('#app');
