<template>
  <div>
    <h2>Create your account</h2>
    <button @click="loginWithGoogle()">Continue with Google</button>
    <p>OR</p>
    <div>
      <p for="Email">Email</p>
      <InputText id="Email" class="flex-auto" autocomplete="off" v-model="email" />
      <p for="Password">Password</p>
      <InputText id="Password" class="flex-auto" autocomplete="off" v-model="password" />
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';
import getGoogleOAuthURL from '../utils/googleLogin';
import { ref } from 'vue';
const loginWithGoogle = () => {
  window.location.href = getGoogleOAuthURL();
};
const email = ref('');
const password = ref('');
</script>
