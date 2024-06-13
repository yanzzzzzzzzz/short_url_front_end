<template>
  <Toolbar>
    <template #start>
      <router-link :to="{ name: 'home' }">
        <h2>ShortUrl</h2>
      </router-link>
    </template>
    <template #end>
      <Button class="mr-4" @click="switchMode">
        <i :class="modeIcon"></i>
      </Button>
      <div v-if="userStore.getIsLogin">
        <Button @click="userInfo" class="mr-4">
          <i class="pi pi-user"></i>
        </Button>
        <Button @click="logout">
          <i class="pi pi-sign-out"></i>
        </Button>
      </div>
      <div v-else>
        <router-link to="/login">
          <Button label="Login" text></Button>
        </router-link>
        <router-link to="/signup">
          <Button label="Signup" text></Button>
        </router-link>
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
import { useRouter } from 'vue-router';

const router = useRouter();
const PrimeVue = usePrimeVue();
const currentTheme = ref('aura-dark-green');
const modeIcon = ref('pi pi-moon');
const userStore = useUserStore();
const urlStore = useUrlStore();
const logout = () => {
  userStore.clearUser();
  userStore.setIsLogin(false);
  urlStore.clearUrl();
  logoutService.logout();
  router.push({ name: 'home' });
};
const userInfo = () => {
  router.push({ name: 'userInfo' });
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
