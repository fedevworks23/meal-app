<template>
  <div class="search-meal">
    <div class="wrap">
      <div class="searchBox">
        <input
          class="searchBox-input"
          type="text"
          v-model.trim="searchString"
          placeholder="Search Meal"
          @input="
            searchString.length >= 1
              ? get_meals_response($event.target.value)
              : null
          "
        />
        <button class="searchBox-botton" @click="UPDATE_SEARCH_STRING('')">
          &#x2716;
        </button>
      </div>

      <!-- Imported loading component -->
      <loading-page v-if="loading" class="errorText"> </loading-page>

      <!-- If no results found for meals -->
      <div v-else-if="ifResponseIsEmpty" class="errorText">
        No results found for Meal "{{ searchString }}"
      </div>

      <div class="main-container" v-else-if="ifStringIsNotEmpty">
        <ul class="cards">
          <li
            class="cards_item"
            v-for="(meals, index) in mealsResponse"
            :key="index"
          >
            <div class="card">
              <div class="card_image">
                <img :src="meals.strMealThumb" :alt="meals.strMeal" />
              </div>
              <div class="card_content">
                <h2 class="card_title">{{ meals.strMeal }}</h2>
                <p class="card_text">
                  {{ meals.strCategory }}
                </p>
                <button
                  class="btn card_btn"
                  @click="showSelectedMealDetails(meals.strMeal)"
                >
                  View Meal
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import LoadingPage from "@/components/LoadingPageComponent";

export default {
  name: "SearchMeal",
  computed: {
    ...mapState(["searchForMealStr", "loading", "mealsResponse"]),
    searchString: {
      get() {
        return this.searchForMealStr;
      },
      set(value) {
        this.UPDATE_SEARCH_STRING(value);
      }
    },
    ifResponseIsEmpty() {
      return this.searchString.length >= 1 && this.mealsResponse.length === 0;
    },
    ifStringIsNotEmpty() {
      return this.searchString.length >= 1 && this.mealsResponse.length >= 1;
    }
  },
  components: {
    "loading-page": LoadingPage
  },
  methods: {
    ...mapMutations(["UPDATE_SEARCH_STRING"]),
    ...mapActions(["get_meals_response", "get_selected_meal_item"]),
    showSelectedMealDetails(mealName) {
      this.$router.push({
        name: "Home",
        params: { mealName: mealName }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.errorText {
  text-align: center;
  font-size: 1em;
  color: #fff;
  margin: 13px auto;
}

/* Search CSS */

.searchBox {
  width: 50%;
  display: block;
  margin: 0 auto;
  position: sticky;
  top: 1%;
  z-index: 1;
  box-shadow: 0 20px 40px -14px #000;

  .searchBox-input {
    width: 100%;
    height: 42px;
    padding: 10px 100px 10px 20px;
    border-radius: 100px;
    border: 1px solid #ccc;
    font-size: 20px;
    line-height: 1;
    box-sizing: border-box;
    outline: none;
  }
  .searchBox-botton {
    position: absolute;
    width: 36px;
    right: 3px;
    top: 3px;
    bottom: 3px;
    border: 0;
    background: #d1095e;
    color: #fff;
    outline: none;
    margin: 0;
    padding: 0 10px;
    border-radius: 100px;
    z-index: 2;
    cursor: pointer;
  }
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;

  .cards {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;

    .cards_item {
      display: flex;
      padding: 1rem;

      .card {
        background-color: white;
        border-radius: 0.25rem;
        box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .card_image {
          padding: 6px;
          background: transparent;
          box-shadow: inset 0px 0px 3px #000;

          img {
            height: auto;
            max-width: 100%;
            vertical-align: middle;
            box-shadow: 0px 0px 3px 0px #000;
            border-radius: 1px;
          }
        }

        .card_content {
          padding: 1rem;
          background: linear-gradient(
            to bottom left,
            #42b983 40%,
            #7bdbaf 100%
          );
          height: 100%;
          position: relative;

          .card_title {
            color: #ffffff;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: capitalize;
            margin: 0px;
          }

          .card_text {
            color: #ffffff;
            font-size: 0.775rem;
            line-height: 1.5;
            font-weight: 400;
            padding-bottom: 2rem;
          }

          .btn {
            color: #ffffff;
            padding: 0.4rem;
            margin: 0.5em auto;
            font-size: 0.775rem;
            text-transform: uppercase;
            border-radius: 4px;
            font-weight: 400;
            display: block;
            width: 90%;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: transparent;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            &:hover {
              background-color: rgba(255, 255, 255, 0.12);
            }
          }
        }
      }
    }
  }
}

// Staring Width : 480px;
@media (min-width: 30rem) {
  .cards_item {
    width: 50%;
  }
}

// Starting Width : 786px;
@media (min-width: 48rem) {
  .cards_item {
    width: 33.3333%;
  }
}

// Starting Width : 1024px;
@media (min-width: 64rem) {
  .cards_item {
    width: 25%;
  }
}

@media (min-width: 75rem) {
  .cards_item {
    width: 20%;
  }
}
</style>
