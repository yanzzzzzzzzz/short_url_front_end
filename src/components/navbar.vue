<template>
  <Toolbar>
    <template #start>
      <router-link :to="{ name: 'home' }">
        <h2>Short Url</h2>
      </router-link>
    </template>
    <template #end>
      <div v-if="userStore.user.token === ''">
        <router-link to="/login">
          <Button label="Login"></Button>
        </router-link>
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
