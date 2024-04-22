<template>
  <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '50vw' }">
    <template #header>
      <h2>Edit link</h2>
    </template>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="title" class="font-semibold w-6rem">Title</label>
      <InputText id="title" class="flex-auto" autocomplete="off" v-model="title" />
    </div>
    <div class="flex align-items-center gap-3 mb-2">
      <label for="shortUrl" class="font-semibold w-6rem">Short url</label>
      <InputText
        id="shortUrl"
        class="flex-auto"
        autocomplete="off"
        v-model="nowEditSelectShortUrl"
      />
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="visible = false" />
      <Button
        label="Save"
        outlined
        severity="secondary"
        @click="updateUrl(shortUrl, nowEditSelectShortUrl, title)"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Ref } from 'vue';
defineProps({
  shortUrl: {
    required: true,
    type: String
  }
});
const emits = defineEmits(['updateUrl']);

const updateUrl = (
  originalShortUrl: string,
  newShortUrl: string | undefined,
  newTitle: string | undefined
) => {
  emits('updateUrl', originalShortUrl, newShortUrl, newTitle);
};

const visible = defineModel('visible') as Ref<boolean | undefined>;
const title = defineModel('title') as Ref<string | undefined>;
const nowEditSelectShortUrl = defineModel('nowEditSelectShortUrl') as Ref<string | undefined>;
</script>
