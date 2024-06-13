<template>
  <div class="center-container">
    <h2>User profile</h2>
    <div class="form-container">
      <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputText id="username" v-model="userInfo.username" />
      </div>
      <div class="flex flex-column gap-2">
        <label for="email">Email</label>
        <InputText id="email" v-model="userInfo.email" />
      </div>
      <Button class="mt-4" label="Update" :loading="loading" @click="updateUser"></Button>
      <Button class="mt-4" severity="danger" label="Delete Account"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
import userService from '../service/user';
import { UserInfoModel } from '../models/UserModel';
const userInfo = ref<UserInfoModel>({
  username: '',
  email: ''
});
const loading = ref(false);
onMounted(async () => {
  const data = await userService.getUser();
  userInfo.value = data;
});
const updateUser = async () => {
  try {
    loading.value = true;
    const { data } = await userService.updateUser(userInfo.value);
  } catch (error) {
  } finally {
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
</style>
