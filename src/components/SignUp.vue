<template>
  <div class="center-container">
    <h2>Create your account</h2>
    <form @submit.prevent="createUser">
      <div class="form-container">
        <FloatLabel class="mt-4">
          <InputText id="email" v-model="email" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel class="mt-4">
          <InputText id="username" v-model="username" />
          <label for="username">User name</label>
        </FloatLabel>
        <FloatLabel class="mt-4">
          <Password
            id="current-password"
            v-model="password"
            :feedback="false"
            data-cy="password"
            :inputProps="{ autocomplete: 'on' }"
          />
          <label for="password">Password</label>
        </FloatLabel>
        <div v-if="errorMessage" class="pt-1 text-red-500">{{ errorMessage }}</div>
        <p>
          Already have an account?
          <a>Log in.</a>
        </p>
        <Button class="mb-2" label="Sign up" type="submit" :loading="loading"></Button>
        <div class="css-1mkmswe">OR</div>
        <Button class="my-3" @click="loginWithGoogle()" label="Continue with Google"></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { getGoogleOAuthURLSignUp } from '../utils/googleLogin';
import { ref, Ref } from 'vue';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { CreateUserModel } from '../models/UserModel';
import registerService from '../service/register';
import { useRouter } from 'vue-router';

const router = useRouter();
const emits = defineEmits(['createUser']);
const email = ref('');
const password = ref('');
const username = ref('');
const errorMessage = ref('');
const loading = ref(false);

const loginWithGoogle = () => {
  window.location.href = getGoogleOAuthURLSignUp('consent');
};

const createUser = async () => {
  try {
    loading.value = true;
    const newUser: CreateUserModel = {
      username: username.value,
      email: email.value,
      password: password.value
    };
    await registerService.createUser(newUser);
    router.push({ name: 'home' });
  } catch (error) {
    console.log(error.response.data.error);
    errorMessage.value = error.response.data.error;
    loading.value = false;
  }
};
</script>
<style scoped>
.center-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.form-container {
  display: flex;
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
</style>
