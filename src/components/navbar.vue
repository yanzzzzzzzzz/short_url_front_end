<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand">Short Url</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <form class="d-flex">
          <div v-if="userStore.user.token === null">
            <router-link to="/login" v-if="userStore.user.token === null" class="mr-2">
              <button class="btn btn-outline-success" type="submit">Login</button>
            </router-link>
          </div>
          <div to="/login" v-else>
            <button class="btn btn-outline-success" @click="logout">Logout</button>
          </div>
        </form>
      </div>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/UserStore';
import { useUrlStore } from '../stores/UrlStore';
const userStore = useUserStore();
const urlStore = useUrlStore();
const logout = () => {
  userStore.clearUser();
  urlStore.clearUrl();
  localStorage.removeItem('loginInfo');
};
</script>
