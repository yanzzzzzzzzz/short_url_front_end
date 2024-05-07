<template>
  <div class="center-container">
    <h1>Login</h1>
    <div class="form-container">
      <FloatLabel class="mt-4">
        <InputText id="email" v-model="email" />
        <label for="email">Email</label>
      </FloatLabel>
      <FloatLabel class="mt-4">
        <Password id="password" v-model="password" :feedback="false" />
        <label for="password">Password</label>
      </FloatLabel>
      <div v-if="errorMessage" class="errorMsg">{{ errorMessage }}</div>
      <Button class="my-3" data-cy="submit" label="Login" @click="login"></Button>
      <div class="css-1mkmswe">OR</div>
      <Button class="my-3" label="Continue with Google" @click="loginWithGoogle()"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import loginService from '../service/login';
import { ref } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/UserStore';
import { getCookie } from '../utils/cookie';
import { getGoogleOAuthURLLogin } from '../utils/googleLogin';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const userStore = useUserStore();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  if (email.value && password.value) {
    try {
      await loginService.login({
        email: email.value,
        password: password.value
      });
      const name = getCookie('username');
      if (name !== '') {
        userStore.setUser({ username: name });
      }
      router.push({ name: 'home' });
    } catch (error) {
      errorMessage.value = 'Incorrect email or password.';
    }
  } else {
    errorMessage.value = 'Please enter both username and password.';
  }
};

const loginWithGoogle = async () => {
  window.location.href = getGoogleOAuthURLLogin('select_account');
};
</script>
<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
}
.center-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.css-1mkmswe {
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 1fr 0fr 1fr;
  gap: 1rem;
  color: #3a4863;
  font-family: Proxima Nova;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  widows: 100%;
}
.css-1mkmswe::before {
  content: '';
  height: 0.0625rem;
  width: 100%;
  background: #dbe0eb;
  margin: auto 0;
}
.css-1mkmswe::after {
  content: '';
  height: 0.0625rem;
  width: 100%;
  background: #dbe0eb;
  margin: auto 0;
}
.errorMsg {
  color: red;
}
</style>
