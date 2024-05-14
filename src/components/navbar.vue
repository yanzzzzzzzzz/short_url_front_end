<template>
  <Toolbar>
    <template #start>
      <router-link :to="{ name: 'home' }">
        <h2>ShortUrl</h2>
      </router-link>
    </template>
    <template #end>
      <button
        class="border-1 border-solid cursor-pointer surface-card surface-border flex mr-2"
        @click="switchMode"
      >
        <i :class="modeIcon"></i>
      </button>
      <div v-if="userStore.user.username === ''">
        <router-link to="/login" class="mr-2"> Login </router-link>
        <router-link to="/signup" class="mr-2"> Signup </router-link>
      </div>
      <div v-else>
        <Button label="Logout" @click="logout"></Button>
      </div>
    </template>
  </Toolbar>

  <main>
    <router-view />
  </main>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/UserStore';
import { useUrlStore } from '../stores/UrlStore';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import logoutService from '../service/logout';
import { usePrimeVue } from 'primevue/config';
import { ref } from 'vue';
const PrimeVue = usePrimeVue();
const currentTheme = ref('aura-dark-green');
const modeIcon = ref('pi pi-sun');
const userStore = useUserStore();
const urlStore = useUrlStore();
const logout = () => {
  userStore.clearUser();
  urlStore.clearUrl();
  logoutService.logout();
};
const switchMode = () => {
  console.log('change');
  if (currentTheme.value === 'aura-light-green') {
    PrimeVue.changeTheme('aura-light-green', 'aura-dark-green', 'theme-link', () => {});
    modeIcon.value = 'pi pi-moon';
    currentTheme.value = 'aura-dark-green';
  } else if (currentTheme.value === 'aura-dark-green') {
    PrimeVue.changeTheme('aura-dark-green', 'aura-light-green', 'theme-link', () => {});
    currentTheme.value = 'aura-light-green';
    modeIcon.value = 'pi pi-sun';
  }
};
</script>
<style scoped>
a {
  color: var(--text-color);
  text-decoration: none;
}
.surface-card {
  background-color: var(--surface-card) !important;
}
.surface-border {
  border-color: var(--surface-border) !important;
}
.surface-border:hover {
  border-color: var(--primary-color) !important;
}
</style>
