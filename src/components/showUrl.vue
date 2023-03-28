<template>
  <div
    class="row bg-white text-black rounded my-3 custom-class"
    v-for="(url, shortUrl) in urlMap"
    :key="url"
    style="text-align: left; height: 52px"
  >
    <div class="col-4">
      {{ url.substr(8, 25) }}
    </div>
    <div class="col-4">
      <a :href="shortUrl" target="_blank">{{
        shortUrl.replace("http://localhost:", "")
      }}</a>
    </div>
    <div class="col-2 copy-class" @click="copyUrl(shortUrl)">Copy</div>
    <div class="col-2 delete-class" @click="deleteUrl(shortUrl)">Delete</div>
  </div>
</template>
<script>
export default {
  props: {
    urlMap: {
      required: true,
      type: Array,
    },
  },
  methods: {
    copyUrl(url) {
      navigator.clipboard.writeText(url).then(() => {
        console.log("copy success");
        alert("Success", "Your member information is edited.");
      });
    },
    deleteUrl(url) {},
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
