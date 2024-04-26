<template>
  <div class="login py-2 text-center">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" data-cy="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" data-cy="password" />
      </div>
      <button type="submit" data-cy="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import loginService from '../service/login';
import { ref } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/UserStore';
import { getCookie } from '../utils/cookie';
const userStore = useUserStore();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  if (username.value && password.value) {
    try {
      await loginService.login({
        username: username.value,
        password: password.value
      });
      const name = getCookie('username');
      if (name !== '') {
        userStore.setUser({ username: name });
      }
      router.push({ name: 'home' });
    } catch (error) {
      errorMessage.value = 'Login failed. Please check your credentials.';
    }
  } else {
    errorMessage.value = 'Please enter both username and password.';
  }
};
</script>
<style>
input[type='text'],
input[type='password'] {
  margin: 10px 0;
}
</style>
