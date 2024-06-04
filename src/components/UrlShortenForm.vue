<template>
  <div class="shortUrlForm">
    <p>Shorten a long URL</p>
    <InputText
      class="w-full"
      placeholder="Enter long link here"
      v-model="url"
      data-cy="urlInputText"
    />
    <p>Customize your link(optional)</p>
    <InputText class="w-full" placeholder="Enter alias" v-model="customShortUrl" />
    <p style="color: red">{{ messageStore.getErrorMessage }}</p>
    <Button
      class="mt-4 block"
      @click="generateUrl"
      data-cy="shortUrl"
      label="Shorten URL"
      :loading="loading"
    />
  </div>
</template>
<script setup lang="ts">
import { useMessageStore } from '../stores/MessageStore';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import urlService from '../service/url';
import { ShortUrlModel } from '../models/UrlModel';
import { useUrlStore } from '../stores/UrlStore';
import { showAddUrlSuccessNotification } from '../utils/notifications';
const messageStore = useMessageStore();
const url = ref('');
const customShortUrl = ref('');
const loading = ref(false);
const UrlStore = useUrlStore();
const emits = defineEmits(['fetchData']);

const generateUrl = async (): Promise<void> => {
  try {
    loading.value = true;
    const shortUrlModel = await urlService.createShortUrl(url.value, customShortUrl.value);
    addUrl({
      ...shortUrlModel,
      fullShortUrl: `${window.location.origin}/api/url/${shortUrlModel.shortUrl}`
    });
    url.value = '';
    emits('fetchData');
    messageStore.setErrorMessage('');
    loading.value = false;
  } catch (error) {
    messageStore.setErrorMessage(error.response.data.error);
    loading.value = false;
  }
};
const addUrl = (shortUrlModel: ShortUrlModel): void => {
  UrlStore.addUrl(shortUrlModel);
  showAddUrlSuccessNotification();
};
</script>
<style scoped>
.shortUrlForm {
  text-align: left;
  padding: 2rem;
  display: inline-block;
  width: 500px;
  border-radius: 0.6rem;
  margin-bottom: 1rem;
}
</style>
