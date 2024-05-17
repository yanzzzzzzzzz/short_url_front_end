<template>
  <Panel class="mt-3 text-left">
    <template #header>
      <div class="flex align-items-center gap-2">
        <img
          style="height: 2.5rem; width: 2.5rem"
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
    <div class="ml-6">
      <div class="mb-3">
        <a :href="url.fullShortUrl" target="_blank">{{ url.fullShortUrl }}</a>
      </div>
      <div>
        <a class="originalUrl-text" :href="url.originUrl" target="_blank">{{ url.originUrl }} </a>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-wrap align-items-center justify-content-between ml-5">
        <div class="flex align-items-center">
          <Button icon="pi pi-calendar" v-tooltip.bottom="tooltipConfig" rounded text></Button
          >{{ moment.utc(url.createTime).local().format('MMMM D, YYYY') }}
        </div>
        <span class="p-text-secondary">Updated 2 hours ago</span>
      </div>
    </template>
  </Panel>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import { ShortUrlModel } from '../models/UrlModel';
import moment from 'moment';
import { ref } from 'vue';
const props = defineProps({
  url: {
    required: true,
    type: Object as () => ShortUrlModel
  }
});
const emits = defineEmits(['deleteUrl', 'copyUrl', 'editUrl']);
const tooltipConfig = ref({
  value: moment.utc(props.url.createTime).local().format('YYYY-MM-DD HH:mm:ss'),
  pt: {
    arrow: {
      style: {
        borderBottomColor: 'var(--primary-color)'
      }
    },
    text: 'bg-primary font-medium'
  }
});
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
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 60%;
}
.icon-button {
  color: var(--text-color);
  background-color: transparent;
  border: 0.1rem solid #c3cbdc;
}
.icon-button:hover {
  background-color: #f0f0f0;
}
.p-panel::deep .p-panel-header {
  border-bottom: none;
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
