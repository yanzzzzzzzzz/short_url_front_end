<template>
  <div class="center-container">
    <h2>Create your account</h2>
    <form @submit.prevent="createUser">
      <div class="form-container">
        <FloatLabel class="mt-4">
          <InputText id="email" v-model="email" data-cy="email" :invalid="emailInvalid" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel class="mt-4">
          <InputText
            id="username"
            v-model="username"
            data-cy="username"
            :invalid="usernameInvaild"
          />
          <label for="username">User name</label>
        </FloatLabel>
        <FloatLabel class="mt-4">
          <Password
            id="current-password"
            v-model="password"
            :feedback="false"
            data-cy="password"
            :inputProps="{ autocomplete: 'on' }"
            :invalid="passwordInvaild"
          />
          <label for="password">Password</label>
        </FloatLabel>
        <div v-if="errorMessage" class="pt-1 text-red-500">{{ errorMessage }}</div>
        <p>
          Already have an account?
          <a>Log in.</a>
        </p>
        <Button
          class="mb-2 button-fixed-size"
          label="Sign up"
          type="submit"
          :loading="loading"
          data-cy="signup"
        ></Button>
        <div class="or-divider">OR</div>
        <Button
          class="my-3 button-fixed-size"
          @click="loginWithGoogle()"
          label="Continue with Google"
        ></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { getGoogleOAuthURLAuth } from '../utils/googleLogin';
import { ref } from 'vue';
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
const emailInvalid = ref(false);
const passwordInvaild = ref(false);
const usernameInvaild = ref(false);

const loginWithGoogle = () => {
  window.location.href = getGoogleOAuthURLAuth('consent');
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
    if (
      errorMessage.value === 'email is invalid' ||
      errorMessage.value === 'This email is already registered'
    ) {
      emailInvalid.value = true;
      passwordInvaild.value = false;
      usernameInvaild.value = false;
    } else if (
      errorMessage.value === "password can't be null" ||
      errorMessage.value === 'password length need to more than 8'
    ) {
      passwordInvaild.value = true;
      emailInvalid.value = false;
      usernameInvaild.value = false;
    } else if (errorMessage.value === 'user name length need to more than 5') {
      passwordInvaild.value = false;
      emailInvalid.value = false;
      usernameInvaild.value = true;
    }
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
  height: 100vh;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.or-divider {
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 1fr 0fr 1fr;
  gap: 1rem;
  color: var(--text-color);
  font-family: Proxima Nova;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  width: 250px;
  margin: 0 auto;
}
.or-divider::before,
.or-divider::after {
  content: '';
  height: 0.0625rem;
  width: 100%;
  background: var(--text-color);
  margin: auto 0;
}
.pt-1.text-red-500 {
  width: auto;
  white-space: nowrap;
}
.button-fixed-size {
  width: 250px;
}
</style>
