import Vue from "vue";
import Vuex from "vuex";
import { getMealsDetails, searchMeal } from "../service/axiosCall";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchForMealStr: "",
    loading: false,
    mealItem: [],
    mealsResponse: [],
    networkError: {
      status: false,
      message: ""
    }
  },
  getters: {
    searchForMealStr: state => state.searchForMealStr,
    loading: state => state.loading,
    mealItem: state => state.mealItem,
    mealsResponse: state => state.mealsResponse,
    networkError: state => state.networkError
  },
  mutations: {
    UPDATE_SEARCH_STRING(state, data) {
      state.searchForMealStr = data;
    },
    CHANGE_LOADING_STATUS(state, data) {
      state.loading = data;
      state.networkError.status = false;
    },
    SAVE_MEALS_RESPONSE(state, data) {
      state.mealsResponse = data !== null && data !== undefined ? data : [];
      state.loading = false;
    },
    SAVE_SELECTED_MEAL_ITEM(state, data) {
      state.mealItem = [];
      state.mealItem =
        data !== null && data !== [] && data !== undefined ? data[0] : [];
      state.loading = false;
    },
    ERROR_RESPONSE(state, data) {
      state.loading = false;
      state.networkError.status = true;
      state.networkError.message = data.message;
    }
  },
  actions: {
    async get_random_meals({ commit }) {
      commit("CHANGE_LOADING_STATUS", true);
      let response = await getMealsDetails();
      commit("SAVE_SELECTED_MEAL_ITEM", response);
    },
    async get_meals_response({ commit }, userQuery) {
      commit("CHANGE_LOADING_STATUS", true);
      var response = await searchMeal(userQuery);
      commit("SAVE_MEALS_RESPONSE", response);
    },
    async get_selected_meal_item({ commit }, mealName) {
      commit("CHANGE_LOADING_STATUS", true);
      // console.log(mealName);
      const response = await searchMeal(mealName);
      commit("SAVE_SELECTED_MEAL_ITEM", response);
    }
  },
  modules: {}
});
