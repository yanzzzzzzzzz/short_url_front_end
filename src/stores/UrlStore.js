import { defineStore } from 'pinia';

export const useUrlStore = defineStore('UrlStore', {
  state: () => ({
    urls: []
  }),
  actions: {
    setUrl(urlList) {
      this.urls = urlList;
    },
    addUrl(urlObject) {
      this.urls.push(urlObject);
    },
    deleteUrl(urlObject) {
      this.urls = this.urls.filter((u) => u.shortUrl !== urlObj.shortUrl);
    },
    clearUrl() {
      this.urls = [];
    }
  },
  getters: {
    getUrls() {
      return this.urls;
    }
  }
});
