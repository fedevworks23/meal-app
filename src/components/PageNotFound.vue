<template>
  <div class="page-not-found">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  data() {
    return {
      message: "PageNotFound"
    };
  }
};
</script>

<style lang="scss" scoped>
.page-not-found {
  padding: 3em;
  font-size: 2em;
  color: #ededed;
  text-align: center;
}
</style>
