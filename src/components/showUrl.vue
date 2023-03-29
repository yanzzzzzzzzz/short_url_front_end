<template>
  <div
    class="row bg-white text-black rounded my-3 custom-class"
    v-for="(url, shortUrl) in urlMap"
    :key="url"
    style="text-align: left; height: 52px"
  >
    <div class="col-5">
      {{ url.substr(8, 25) }}
    </div>
    <div class="col-5">
      <a :href="shortUrl" target="_blank">{{
        shortUrl.replace("http://localhost:", "")
      }}</a>
    </div>
    <div class="col-auto">
      <font-awesome-icon
        :icon="['fa', 'copy']"
        size="lg"
        @click="copyUrl(shortUrl)"
        class="copy-class"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="delete-class"
        :icon="['fa', 'trash']"
        size="lg"
        @click="deleteUrl({ url, shortUrl })"
      />
    </div>
  </div>
</template>
<script>
export default {
  emits: ["deleteUrl"],
  props: {
    urlMap: {
      required: true,
      type: Object,
    },
  },
  methods: {
    copyUrl(url) {
      navigator.clipboard.writeText(url).then(() => {
        console.log("copy success");
        alert("Success", "copy success.");
      });
    },
    deleteUrl(urlObj) {
      this.$emit("deleteUrl", urlObj);
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
.copy-class {
  color: #007bff;
  cursor: pointer;
}

.delete-class {
  color: red;
  cursor: pointer;
}
</style>
