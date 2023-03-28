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
    <div class="col-4">
      <a :href="shortUrl" target="_blank">{{
        shortUrl.replace("http://localhost:", "")
      }}</a>
    </div>
    <div class="col-1">Copy</div>
    <div class="col-2">Delete</div>
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
  methods: {},
};
</script>
<style>
.custom-class {
  display: flex;
  align-items: center;
  height: 200px;
}
</style>
