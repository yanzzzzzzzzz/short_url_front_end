<template>
  <div class="mb-4">
    <h1 style="text-align: left">Links</h1>
    <hr />
    <div v-if="urlMap.length > 0" v-for="url in urlMap" :key="url.shortUrl">
      <UrlLinkPanel :url="url" @copyUrl="copyUrl" @editUrl="editUrl" @deleteUrl="deleteUrl" />
    </div>
    <div v-else style="display: flex; justify-content: center">
      <p>no link here.</p>
    </div>
    <EditUrlDialog
      v-model:visible="visible"
      v-model:title="nowEditTitle"
      :shortUrl="nowEditShortUrl"
      v-model:nowEditSelectShortUrl="nowEditSelectShortUrl"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';
import {
  showCopySuccessNotification,
  showDeleteSuccessNotification,
  showErrorNotification
} from '../utils/notifications';
import EditUrlDialog from './EditUrlDialog.vue';
import urlService from '../service/url';
import { useUrlStore } from '../stores/UrlStore';
import UrlLinkPanel from './UrlLinkPanel.vue';
const UrlStore = useUrlStore();

defineProps({
  urlMap: {
    required: true,
    type: Object
  }
});
const visible = ref(false);
const nowEditTitle = ref('');
const nowEditShortUrl = ref('');
const nowEditSelectShortUrl = ref('');

const copyUrl = (shortUrl: string) => {
  navigator.clipboard.writeText(shortUrl).then(() => {
    showCopySuccessNotification();
  });
};

const deleteUrl = async (urlObj: ShortUrlModel): Promise<void> => {
  try {
    await urlService.deleteUrl(urlObj.shortUrl);
    UrlStore.deleteUrl(urlObj);
    showDeleteSuccessNotification();
  } catch (error) {
    showErrorNotification(error.response.data.error);
  }
};

const editUrl = (urlObj: ShortUrlModel) => {
  nowEditTitle.value = urlObj.title;
  nowEditShortUrl.value = urlObj.shortUrl;
  nowEditSelectShortUrl.value = urlObj.shortUrl;
  visible.value = true;
};
</script>
<style scoped></style>
