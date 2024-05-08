<template>
  <SignUp @createUser="createUser" v-model:errorMessage="errorMessage" />
</template>
<script setup lang="ts">
import SignUp from '../components/SignUp.vue';
import registerService from '../service/register';
import { CreateUserModel } from '../models/UserModel';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const errorMessage = ref('');
const router = useRouter();
const createUser = async (newUser: CreateUserModel) => {
  try {
    await registerService.createUser(newUser);
    router.push({ name: 'home' });
  } catch (error) {
    console.log(error.response.data.error);
    errorMessage.value = error.response.data.error;
  }
};
</script>
