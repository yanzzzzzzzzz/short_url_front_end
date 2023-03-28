<template>
  <div class="container pt-2" style="max-width: 550px; min-height: 300px">
    <div class="row">
      <div class="col">
        <h1>Free URL Shortener</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Enter link here"
          v-model="url"
        />
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary" @click="generateUrl">
          Shorten URL
        </button>
      </div>
    </div>
    <showUrl :urlMap="urlMap" />
  </div>
  <div
    class="text-black"
    style="background-color: #f5f7f8; min-height: 300px; padding: 100px 300px"
  >
    <h2>Squeeze more into every link.</h2>
    <div>
      With URLSqueezer, you can turn long and unwieldy URLs into short, snappy
      links that are easy to share, remember, and use. Our powerful compression
      technology lets you fit more information into every link, making it the
      perfect tool for social media, email marketing, and any other situation
      where space is at a premium. So why settle for long and complicated URLs
      when you can squeeze more into every link with URLSqueezer?
    </div>
  </div>
</template>

<script>
import urlService from "../service/url";
import showUrl from "../components/showUrl.vue";
export default {
  components: {
    showUrl,
  },
  data() {
    return {
      url: "",
      urlMap: {
        "https://goo.gl": "https://www.google.com",
        "https://fb.me": "https://www.facebook.com",
      },
    };
  },
  methods: {
    generateUrl() {
      console.log("generateUrl", this.url);
      urlService.getShortenUrl(this.url).then((data) => {
        console.log("data", data);
        this.addUrl(this.url, data.shortUrl);
      });
    },
    addUrl(url, shortUrl) {
      this.urlMap[shortUrl] = url;
    },
  },
};
</script>
<style>
.custom-class {
  display: flex;
  align-items: center;
  height: 200px;
}
.cross {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
}

.cross:before,
.cross:after {
  content: "";
  position: absolute;
  width: 12px;
  height: 1px;
  background-color: #000;
}

.cross:before {
  transform: rotate(45deg);
}

.cross:after {
  transform: rotate(-45deg);
}
</style>
