<template>
  <div
    class="row bg-white text-black rounded my-3 custom-class"
    v-for="url in urlMap"
    :key="url.shortUrl"
    style="text-align: left; height: 52px"
  >
    <div class="col-5">
      {{ showUrlFormatted(url.originUrl) }}
    </div>
    <div class="col-4"></div>
    <div class="col-auto">
      <font-awesome-icon
        class="text-primary"
        role="button"
        :icon="['fa', 'link']"
        size="lg"
        @click="openRedirectUrl(url.shortUrl)"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="text-secondary"
        role="button"
        :icon="['fa', 'copy']"
        size="lg"
        @click="copyUrl(url.shortUrl)"
      />
    </div>
    <div class="col-auto">
      <font-awesome-icon
        class="text-danger"
        role="button"
        :icon="['fa', 'trash']"
        size="lg"
        @click="deleteUrl(url)"
      />
    </div>
  </div>
</template>
<script>
export default {
  emits: ['deleteUrl'],
  props: {
    urlMap: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      maxLength: 20,
    };
  },
  methods: {
    copyUrl(url) {
      navigator.clipboard.writeText(url).then(() => {
        console.log('copy success');
        alert('Success', 'copy success.');
      });
    },
    deleteUrl(urlObj) {
      this.$emit('deleteUrl', urlObj);
    },
    openRedirectUrl(shortUrl) {
      const url = `${window.location.origin}\\api\\url\\${shortUrl}`;
      window.open(url, '_blank');
    },
    showUrlFormatted(url) {
      const formatUrl = url.replace(/^(https?:\/\/)?/, '');
      if (formatUrl.length > this.maxLength) {
        return formatUrl.slice(0, this.maxLength) + '...';
      } else {
        return formatUrl;
      }
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
</style>
