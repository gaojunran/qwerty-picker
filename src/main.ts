import Aura from '@primeuix/themes/aura';

import { createPinia } from 'pinia'
import { Button } from 'primevue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import './assets/main.css'
import 'primeicons/primeicons.css'


const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(ConfirmationService);
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.always-dark'
      }
  }
})
app.component("Button", Button);


app.mount('#app')
