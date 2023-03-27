<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div>Free URL Shortener</div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  methods: {
    generateUrl() {
      console.log("generateUrl", this.url);
      fetch("")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    },
  },
};
</script>
