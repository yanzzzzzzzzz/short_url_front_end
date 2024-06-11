<template>
  <div v-if="urls.length > 0">
    <div v-for="url in urls" :key="url.shortUrl">
      <UrlLinkPanel :url="url" @copyUrl="copyUrl" @editUrl="editUrl" @deleteUrl="deleteUrl" />
    </div>
  </div>
  <div v-else class="flex justify-content-center">
    <p>no link here.</p>
  </div>
</template>

<script setup lang="ts">
import UrlLinkPanel from './UrlLinkPanel.vue';
import { ShortUrlModel } from '../models/UrlModel';
import {
  showCopySuccessNotification,
  showDeleteSuccessNotification,
  showErrorNotification
} from '../utils/notifications';
import urlService from '../service/url';
import { useUrlStore } from '../stores/UrlStore';

defineProps<{
  urls: ShortUrlModel[];
}>();
const emits = defineEmits(['editUrl', 'fetchData']);

const UrlStore = useUrlStore();

const copyUrl = (shortUrl: string) => {
  navigator.clipboard.writeText(shortUrl).then(() => {
    showCopySuccessNotification();
  });
};

const deleteUrl = async (urlObj: ShortUrlModel): Promise<void> => {
  try {
    await urlService.deleteUrl(urlObj.shortUrl);
    await emits('fetchData');
    showDeleteSuccessNotification();
  } catch (error) {
    showErrorNotification(error.response.data.error);
  }
};

const editUrl = (urlObj: ShortUrlModel) => {
  emits('editUrl', urlObj);
};
</script>

<style scoped>
/* 添加一些样式 */
</style>
