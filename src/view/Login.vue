<template>
  <div class="center-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-container">
        <FloatLabel class="mt-4">
          <InputText id="email" v-model="email" data-cy="email" :invalid="emailInvalid" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel class="mt-4">
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            data-cy="password"
            :invalid="passwordInvalid"
            :inputProps="{ autocomplete: 'on' }"
          />
          <label for="password">Password</label>
        </FloatLabel>
        <div v-if="errorMessage" class="errorMsg mt-2">{{ errorMessage }}</div>
        <Button
          class="my-3"
          data-cy="login"
          label="Login"
          type="submit"
          :loading="loading"
        ></Button>
        <div class="css-1mkmswe">OR</div>
        <Button class="my-3" label="Continue with Google" @click="loginWithGoogle()"></Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import loginService from '../service/login';
import { ref } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/UserStore';
import { getCookie } from '../utils/cookie';
import { getGoogleOAuthURLAuth } from '../utils/googleLogin';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const userStore = useUserStore();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const emailInvalid = ref(false);
const passwordInvalid = ref(false);
const loading = ref(false);

const login = async () => {
  if (email.value && password.value) {
    try {
      loading.value = true;
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
      password.value = '';
      errorMessage.value = 'Incorrect email or password.';
      loading.value = false;
    }
  } else {
    emailInvalid.value = email.value === '';
    passwordInvalid.value = password.value === '';
    errorMessage.value = "Email or password can't be null";
  }
};

const loginWithGoogle = async () => {
  window.location.href = getGoogleOAuthURLAuth('select_account');
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
  color: var(--text-color);
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
  background: var(--text-color);
  margin: auto 0;
}
.css-1mkmswe::after {
  content: '';
  height: 0.0625rem;
  width: 100%;
  background: var(--text-color);
  margin: auto 0;
}
.errorMsg {
  color: red;
}
</style>
