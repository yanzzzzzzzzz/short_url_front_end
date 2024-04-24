<template>
  <div>
    <h2>Create your account</h2>
    <button>Continue with Google</button>
    <p>OR</p>
    <div>
      <p for="Email">Email</p>
      <InputText id="Email" class="flex-auto" autocomplete="off" v-model="title" />
      <p for="Password">Password</p>
      <InputText id="Password" class="flex-auto" autocomplete="off" v-model="password" />
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';
</script>
