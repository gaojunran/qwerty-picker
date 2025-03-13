import { definePreset } from '@primeuix/themes'

import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import { Button } from 'primevue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import './assets/main.css'
import 'primeicons/primeicons.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{purple.50}',
      100: '{purple.100}',
      200: '{purple.200}',
      300: '{purple.300}',
      400: '{purple.400}',
      500: '{purple.500}',
      600: '{purple.600}',
      700: '{purple.700}',
      800: '{purple.800}',
      900: '{purple.900}',
      950: '{purple.950}',
    },
  },
})

const app = createApp(App)

app.use(ConfirmationService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.always-dark',
    },
  },
})
app.component('Button', Button)

app.mount('#app')
