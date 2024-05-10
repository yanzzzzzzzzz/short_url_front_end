<template>
  <Panel style="margin-top: 1rem; text-align: left">
    <template #header>
      <div class="flex align-items-center gap-2 w-9">
        <img
          style="height: 32px; width: 32px"
          :src="
            'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' +
            url.originUrl +
            '&size=64'
          "
        />
        <div class="overflow-ellipsis">
          <span class="">{{ url.title }}</span>
        </div>
      </div>
    </template>
    <template #icons>
      <Button class="ml-2 icon-button" @click="copyUrl(url.fullShortUrl)">
        <span class="pi pi-clone pi-fill"></span>
      </Button>
      <Button class="ml-2 icon-button" @click="editUrl(url)">
        <span class="pi pi-pencil"></span>
      </Button>
      <Button class="ml-2 icon-button" @click="deleteUrl(url)" data-cy="deleteUrl">
        <span class="pi pi-trash"></span>
      </Button>
    </template>
    <div class="pl-3">
      <div>
        <a :href="url.fullShortUrl" target="_blank">{{ url.fullShortUrl }}</a>
      </div>
      <div>
        <a class="originalUrl-text" :href="url.originUrl" target="_blank">{{ url.originUrl }} </a>
      </div>
    </div>
  </Panel>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import { ShortUrlModel } from '../models/UrlModel';
defineProps({
  url: {
    required: true,
    type: Object as () => ShortUrlModel
  }
});
const emits = defineEmits(['deleteUrl', 'copyUrl', 'editUrl']);

const deleteUrl = (urlObj: ShortUrlModel) => {
  emits('deleteUrl', urlObj);
};
const copyUrl = (shortUrl: string) => {
  emits('copyUrl', shortUrl);
};
const editUrl = (urlObj: ShortUrlModel) => {
  emits('editUrl', urlObj);
};
</script>
<style scoped>
.underline-on-hover:hover {
  text-decoration: underline !important;
}
.originalUrl-text {
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 60%;
}
.icon-button {
  color: black;
  background-color: transparent;
  border: 0.1rem solid #c3cbdc;
}
.icon-button:hover {
  background-color: #f0f0f0;
}
.p-panel::v-deep .p-panel-header {
  border-bottom: none;
  background-color: white;
}
a {
  text-decoration: none !important;
}
a:hover {
  text-decoration: underline !important;
}
.overflow-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
