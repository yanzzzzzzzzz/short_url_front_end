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
        <Button class="mb-2" label="Sign up" type="submit"></Button>
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
const emits = defineEmits(['createUser']);
const email = ref('');
const password = ref('');
const username = ref('');
const errorMessage = defineModel('errorMessage') as Ref<string | undefined>;

const loginWithGoogle = () => {
  window.location.href = getGoogleOAuthURLSignUp('consent');
};
const createUser = () => {
  const newUser: CreateUserModel = {
    username: username.value,
    email: email.value,
    password: password.value
  };
  emits('createUser', newUser);
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
