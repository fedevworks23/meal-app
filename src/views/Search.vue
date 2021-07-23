<template>
  <div class="search">
    <SearchMeal></SearchMeal>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchMeal from "@/components/SearchMeal.vue";

export default {
  name: "Search",
  components: {
    SearchMeal
  }
};
</script>
