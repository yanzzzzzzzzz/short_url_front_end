<template>
  <div class="mb-4" style="margin: auto 20rem">
    <h1 style="text-align: left">Links</h1>
    <hr />
    <div v-if="urlMap.length > 0" v-for="url in urlMap" :key="url.shortUrl">
      <Panel style="margin-top: 1rem; text-align: left">
        <template #header>
          <div class="flex align-items-center gap-2">
            <img
              style="height: 32px; width: 32px"
              :src="
                'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' +
                url.originUrl +
                '&size=64'
              "
            />
            <span class="font-bold">{{ url.title }}</span>
          </div>
        </template>
        <template #icons>
          <Button class="ml-2 icon-button" @click="copyUrl(url.fullShortUrl)">
            <span class="pi pi-clone pi-fill"></span>
          </Button>
          <Button class="ml-2 icon-button" @click="editUrl(url)">
            <span class="pi pi-pencil"></span>
          </Button>
          <Button class="ml-2 icon-button" @click="deleteUrl(url)">
            <span class="pi pi-trash"></span>
          </Button>
        </template>
        <div class="pl-3">
          <div>
            <a :href="url.fullShortUrl" target="_blank">{{ url.fullShortUrl }}</a>
          </div>
          <div>
            <a class="originalUrl-text" :href="url.originUrl" target="_blank"
              >{{ url.originUrl }}
            </a>
          </div>
        </div>
      </Panel>
    </div>
    <div v-else style="display: flex; justify-content: center">
      <p>no link here.</p>
    </div>
    <EditUrl
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
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import EditUrl from './EditUrl.vue';
import urlService from '../service/url';
import { useUrlStore } from '../stores/UrlStore';
import { transferIdModel } from '../utils/transfer';
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 800px;
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
.p-panel::v-deep .p-panel-header {
  border-bottom: none;
  background-color: white;
}
.icon-button {
  color: black;
  background-color: transparent;
  border: 0.1rem solid #c3cbdc;
}
.icon-button:hover {
  background-color: #f0f0f0;
}
</style>
