<template>
  <div
    class="row bg-white text-black rounded my-3 custom-class"
    v-for="url in urlMap"
    :key="url.shortUrl"
    style="text-align: left; height: 52px"
  >
    <div class="col-5">
      {{ showUrlFormatted(url.originUrl) }}
    </div>
    <div class="col-4"></div>
    <div class="col-auto">
      <font-awesome-icon
        class="text-primary"
        role="button"
        :icon="['fa', 'link']"
        size="lg"
        @click="openRedirectUrl(url.shortUrl)"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="text-secondary"
        role="button"
        :icon="['fa', 'copy']"
        size="lg"
        @click="copyUrl(url.shortUrl)"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="text-danger"
        role="button"
        :icon="['fa', 'trash']"
        size="lg"
        @click="deleteUrl(url)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';
import { showCopySuccessNotification } from '../utils/notifications';
const props = defineProps({
  urlMap: {
    required: true,
    type: Object
  }
});
const emits = defineEmits(['deleteUrl']);
const maxLength = ref(50);

const copyUrl = (shortUrl: string) => {
  const currentUrl = `${window.location.origin}/api/url/${shortUrl}`;
  navigator.clipboard.writeText(currentUrl).then(() => {
    showCopySuccessNotification();
  });
};

const deleteUrl = (urlObj: ShortUrlModel) => {
  emits('deleteUrl', urlObj);
};

const openRedirectUrl = (shortUrl: string) => {
  const url = `${window.location.origin}/api/url/${shortUrl}`;
  window.open(url, '_blank');
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
<style>
.custom-class {
  display: flex;
  align-items: center;
  height: 200px;
}
</style>
