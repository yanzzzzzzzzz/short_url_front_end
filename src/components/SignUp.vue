<template>
  <div class="center-container">
    <h2>Create your account</h2>
    <div class="dis">
      <FloatLabel class="mt-4">
        <InputText id="email" v-model="email" />
        <label for="email">Email</label>
      </FloatLabel>
      <FloatLabel class="mt-4">
        <InputText id="password" v-model="password" />
        <label for="password">Password</label>
      </FloatLabel>
      <p>
        Already have an account?
        <a>Log in.</a>
      </p>
      <Button class="mb-2" label="Sign up"></Button>
      <div class="css-1mkmswe">OR</div>
      <Button class="my-3" @click="loginWithGoogle()" label="Continue with Google"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { getGoogleOAuthURLSignUp } from '../utils/googleLogin';
import { ref } from 'vue';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';

const loginWithGoogle = () => {
  window.location.href = getGoogleOAuthURLSignUp('consent');
};
const email = ref('');
const password = ref('');
</script>
<style scoped>
.center-container {
  display: flex;
  justify-content: flex-start; /* 將元素置於容器的起始位置 */
  align-items: center; /* 垂直置中 */
  flex-direction: column; /* 將元素垂直排列 */
}
.dis {
  display: flex;
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
</style>
