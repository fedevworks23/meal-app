<template>
  <div class="error-page-component">
    {{ errorMessage.message }}
  </div>
</template>

<script>
export default {
  name: "ErrorPageComponent",
  props: ["errorMessage"]
};
</script>

<style lang="scss" scoped>
.error-page-component {
  text-align: center;
  color: #ffffff;
}
</style>
