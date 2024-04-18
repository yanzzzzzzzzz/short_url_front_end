<template>
  <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '50vw' }">
    <template #header>
      <h2>Edit link</h2>
    </template>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">Title</label>
      <InputText id="username" class="flex-auto" autocomplete="off" :value="title" />
    </div>
    <div class="flex align-items-center gap-3 mb-2">
      <label for="email" class="font-semibold w-6rem">Short url</label>
      <InputText id="email" class="flex-auto" autocomplete="off" :value="shortUrl" />
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="visible = false" />
      <Button label="Save" outlined severity="secondary" @click="visible = false" />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Ref } from 'vue';
defineProps({
  title: {
    required: true,
    type: String
  },
  shortUrl: {
    required: true,
    type: String
  }
});
const visible = defineModel('visible') as Ref<boolean | undefined>;
</script>
