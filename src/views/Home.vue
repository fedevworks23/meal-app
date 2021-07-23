<template>
  <div class="home">
    <loading-page v-if="loading"> </loading-page>
    <meals-details v-else :meals-details="mealItem"> </meals-details>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import LoadingPage from "@/components/LoadingPageComponent";
import MealsDetails from "@/components/MealsDetails.vue";

export default {
  name: "Home",
  components: {
    "loading-page": LoadingPage,
    "meals-details": MealsDetails
  },
  computed: {
    ...mapGetters(["loading", "mealItem"])
  },
  methods: {
    ...mapActions(["get_random_meals", "get_selected_meal_item"])
  },
  created() {
    let mealName = this.$route.params.mealName;
    if (mealName !== undefined) {
      this.get_selected_meal_item(mealName);
    } else {
      this.get_random_meals();
    }
  }
};
</script>

<style lang="scss" scoped></style>
