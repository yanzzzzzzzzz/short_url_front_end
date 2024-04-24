<template>
  <Toolbar>
    <template #start>
      <router-link :to="{ name: 'home' }">
        <h2>ShortUrl</h2>
      </router-link>
    </template>
    <template #end>
      <div v-if="userStore.user.token === ''">
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

const userStore = useUserStore();
const urlStore = useUrlStore();
const logout = () => {
  userStore.clearUser();
  urlStore.clearUrl();
  localStorage.removeItem('loginInfo');
};
</script>
<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
