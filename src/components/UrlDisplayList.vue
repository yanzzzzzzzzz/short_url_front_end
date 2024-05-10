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
      @updateUrl="updateUrl"
      :invalid="invalid"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';
import { showCopySuccessNotification } from '../utils/notifications';
import EditUrlDialog from './EditUrlDialog.vue';
import urlService from '../service/url';
import { useUrlStore } from '../stores/UrlStore';
import { transferIdModel } from '../utils/transfer';
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
const emits = defineEmits(['deleteUrl']);
const maxLength = ref(50);
const invalid = ref(false);

const copyUrl = (shortUrl: string) => {
  navigator.clipboard.writeText(shortUrl).then(() => {
    showCopySuccessNotification();
  });
};

const deleteUrl = (urlObj: ShortUrlModel) => {
  emits('deleteUrl', urlObj);
};
const editUrl = (urlObj: ShortUrlModel) => {
  nowEditTitle.value = urlObj.title;
  nowEditShortUrl.value = urlObj.shortUrl;
  nowEditSelectShortUrl.value = urlObj.shortUrl;
  invalid.value = false;
  visible.value = true;
};
const updateUrl = async (originalShortUrl: string, newShortUrl: string, newTitle: string) => {
  try {
    console.log(
      'originalShortUrl:',
      originalShortUrl,
      'newShortUrl:',
      newShortUrl,
      'newTitle:',
      newTitle
    );
    const data = await urlService.updateUrl(originalShortUrl, newShortUrl, newTitle);
    console.log('response', data);
    UrlStore.updateUrl(originalShortUrl, transferIdModel(data));
    visible.value = false;
  } catch (error) {
    console.log('error', error);
    if (error.response.status === 409) {
      invalid.value = true;
    }
  }
};

const showUrlFormatted = (url: string) => {
  const formatUrl = url.replace(/^(https?:\/\/)?/, '');
  if (formatUrl.length > maxLength.value) {
    return formatUrl.slice(0, maxLength.value) + '...';
  } else {
    return formatUrl;
  }
};
</script>
<style scoped></style>
