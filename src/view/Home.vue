<template>
  <div class="container pt-2" style="max-width: 650px; min-height: 300px">
    <UrlHeader />
    <UrlInputForm v-model="url" @generateUrl="generateUrl" />
    <ShowUrl :urlMap="urls" @deleteUrl="deleteUrl" />
  </div>
  <UrlIntroduction />
</template>

<script>
import urlService from '../service/url';
import ShowUrl from '../components/showUrl.vue';
import UrlInputForm from '../components/UrlInputForm.vue';
import UrlHeader from '../components/UrlHeader.vue';
import UrlIntroduction from '../components/UrlIntroduction.vue';
export default {
  components: {
    ShowUrl,
    UrlInputForm,
    UrlHeader,
    UrlIntroduction,
  },
  data() {
    return {
      url: '',
      urls: [],
    };
  },
  async created() {
    if (this.$store.state.user.token == null) {
      var localStorageUrlList = this.getShortUrlList();
      this.urls =
        localStorageUrlList !== null ? JSON.parse(localStorageUrlList) : [];
    } else {
      const { data: urls } = await urlService.getAllUrl();
      this.urls = urls;
    }
  },
  methods: {
    async generateUrl() {
      const data = await urlService.createShortUrl(this.url);
      this.addUrl(this.url, data.shortUrl);
      this.url = '';
    },
    addUrl(url, shortUrl) {
      this.urls = this.urls.concat({
        originUrl: url,
        shortUrl: `${shortUrl}`,
      });
      if (this.$store.state.user.token == null) {
        this.saveShortUrlList(JSON.stringify(this.urls));
      }
    },
    async deleteUrl(urlObj) {
      this.urls = this.urls.filter((url) => url.shortUrl !== urlObj.shortUrl);
      const response = await urlService.deleteUrl(urlObj.shortUrl);
      if (this.$store.state.token == null) {
        this.saveShortUrlList(JSON.stringify(this.urls));
      }
    },
    saveShortUrlList(shortUrl) {
      localStorage.setItem('shortUrl', shortUrl);
    },
    getShortUrlList() {
      return localStorage.getItem('shortUrl');
    },
  },
};
</script>
