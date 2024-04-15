<template>
  <div>
    <h1 style="text-align: left">Links</h1>
    <hr />
    <div v-if="urlMap.length > 0" v-for="url in urlMap" :key="url.shortUrl">
      <div class="card my-2 p-2" style="max-height: 200px">
        <div class="card-body container">
          <div class="row">
            <div class="col-1">
              <img
                style="height: 32px; width: 32px"
                :src="
                  'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' +
                  url.originUrl +
                  '&size=64'
                "
              />
            </div>
            <div class="col-8" style="color: black; text-align: left">
              <h4 class="underline-on-hover clickable">{{ showUrlFormatted(url.title) }}</h4>
              <div class="pt-2">
                <font-awesome-icon
                  class="text-primary"
                  role="button"
                  :icon="['fa', 'link']"
                  size="lg"
                />
                <a :href="url.fullShortUrl" target="_blank">{{ url.fullShortUrl }}</a>
              </div>
              <div class="pt-1">
                <a class="originalUrl-text" :href="url.originUrl" target="_blank">{{
                  url.originUrl
                }}</a>
              </div>
            </div>
            <div class="col-1">
              <button class="button-border" @click="copyUrl(url.fullShortUrl)">
                <font-awesome-icon
                  class="text-secondary"
                  role="button"
                  :icon="['fa', 'copy']"
                  size="lg"
                />
              </button>
            </div>
            <div class="col-1">
              <button class="button-border">
                <font-awesome-icon
                  style="color: blue"
                  role="button"
                  :icon="['fa', 'edit']"
                  size="lg"
                />
              </button>
            </div>
            <div class="col-1">
              <button class="button-border" @click="deleteUrl(url)">
                <font-awesome-icon
                  class="text-danger"
                  role="button"
                  :icon="['fa', 'trash']"
                  size="lg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="display: flex; justify-content: center">
      <p>no link here.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import 'vue3-toastify/dist/index.css';
import { ShortUrlModel } from '../models/UrlModel';
import { showCopySuccessNotification } from '../utils/notifications';
defineProps({
  urlMap: {
    required: true,
    type: Object
  }
});
const emits = defineEmits(['deleteUrl']);
const maxLength = ref(50);

const copyUrl = (shortUrl: string) => {
  navigator.clipboard.writeText(shortUrl).then(() => {
    showCopySuccessNotification();
  });
};

const deleteUrl = (urlObj: ShortUrlModel) => {
  emits('deleteUrl', urlObj);
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
<style scoped>
.custom-class {
  display: flex;
  align-items: center;
  height: 200px;
}
.clickable {
  cursor: pointer;
}
.url-text {
  color: blue;
}
.underline-on-hover:hover {
  text-decoration: underline !important;
}
.originalUrl-text {
  color: black;
}
a {
  text-decoration: none !important;
}
a:hover {
  text-decoration: underline !important;
}
.button-border {
  border: 0.1rem solid #dbe0eb;
  background-color: white;
}
</style>
