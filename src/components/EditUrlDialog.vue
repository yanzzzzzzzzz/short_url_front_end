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
        :invalid="invalid"
      />
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="visible = false" />
      <Button
        label="Save"
        outlined
        severity="secondary"
        @click="updateUrl(shortUrl, nowEditSelectShortUrl, title)"
        :loading="loading"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref, Ref, onUpdated } from 'vue';
import urlService from '../service/url';
import { useUrlStore } from '../stores/UrlStore';
import { transferIdModel } from '../utils/transfer';
import { showUpdateSuccessNotification } from '../utils/notifications';
const UrlStore = useUrlStore();

defineProps({
  shortUrl: {
    required: true,
    type: String
  }
});

const invalid = ref(false);
const loading = ref(false);
onUpdated(() => {
  invalid.value = false;
  loading.value = false;
});
const updateUrl = async (
  originalShortUrl: string,
  newShortUrl: string | undefined,
  newTitle: string | undefined
) => {
  try {
    loading.value = true;
    const data = await urlService.updateUrl(originalShortUrl, newShortUrl, newTitle);
    UrlStore.updateUrl(originalShortUrl, transferIdModel(data));
    visible.value = false;
    showUpdateSuccessNotification();
  } catch (error) {
    if (error.response.status === 409) {
      invalid.value = true;
    }
    loading.value = true;
  }
};

const visible = defineModel('visible') as Ref<boolean | undefined>;
const title = defineModel('title') as Ref<string | undefined>;
const nowEditSelectShortUrl = defineModel('nowEditSelectShortUrl') as Ref<string | undefined>;
</script>
