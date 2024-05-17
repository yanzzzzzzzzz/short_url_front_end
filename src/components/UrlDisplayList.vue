<template>
  <div class="mb-4">
    <h1 class="text-left">Links</h1>
    <div class="text-left">
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"> </InputIcon>
        <InputText type="search" placeholder="Search..." v-model="searchKeyword"></InputText>
      </IconField>
    </div>
    <hr />
    <div
      v-if="urlMapSearchKeyword.length > 0"
      v-for="url in urlMapSearchKeyword"
      :key="url.shortUrl"
    >
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
import { ref, computed, PropType } from 'vue';
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
import InputText from 'primevue/inputtext';
import { ShortUrl } from '../models/UrlModel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
const UrlStore = useUrlStore();

const props = defineProps({
  urlMap: {
    required: true,
    type: Object
  }
});

const visible = ref(false);
const nowEditTitle = ref('');
const nowEditShortUrl = ref('');
const nowEditSelectShortUrl = ref('');
const searchKeyword = ref('');

const urlMapSearchKeyword = computed(() => {
  if (searchKeyword.value === '') {
    return props.urlMap;
  } else {
    return props.urlMap.filter((url: ShortUrl) =>
      url.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
});
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
