import { defineStore } from 'pinia';
import { ShortUrlModel } from '../models/UrlModel';
export const useUrlStore = defineStore('UrlStore', {
  state: (): { urls: Array<ShortUrlModel> } => ({
    urls: []
  }),
  actions: {
    setUrl(urlList: Array<ShortUrlModel>) {
      this.urls = urlList;
    },
    addUrl(urlObject: ShortUrlModel) {
      this.urls.push(urlObject);
    },
    deleteUrl(urlObject: ShortUrlModel) {
      this.urls = this.urls.filter((u: { shortUrl: string; }) => u.shortUrl !== urlObject.shortUrl);
    },
    clearUrl() {
      this.urls = [];
    }
  },
  getters: {
    getUrls(): Array<ShortUrlModel> {
      return this.urls;
    }
  }
});
