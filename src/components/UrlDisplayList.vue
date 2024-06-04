<template>
  <div class="mb-4">
    <UrlList :urls="UrlStore.getUrls" @editUrl="editUrl" />
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

import EditUrlDialog from './EditUrlDialog.vue';
import UrlList from './UrlList.vue';
import { useUrlStore } from '../stores/UrlStore';
const UrlStore = useUrlStore();
const visible = ref(false);
const nowEditTitle = ref('');
const nowEditShortUrl = ref('');
const nowEditSelectShortUrl = ref('');

const editUrl = (urlObj: ShortUrlModel) => {
  nowEditTitle.value = urlObj.title;
  nowEditShortUrl.value = urlObj.shortUrl;
  nowEditSelectShortUrl.value = urlObj.shortUrl;
  visible.value = true;
};
</script>
<style scoped></style>
