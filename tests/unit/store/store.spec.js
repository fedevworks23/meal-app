import { createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import Vuex from "vuex";
import store from "../../../src/store/index";
import { getMealsDetails, searchMeal } from "../../../src/service/axiosCall";

const localVue = createLocalVue();
localVue.use(Vuex);

const errorMessage = {
  message: undefined,
  status: true
};

describe("Store.spec.js", () => {
  test("Checking Mutation functions ... !", async () => {
    store.commit("UPDATE_SEARCH_STRING", "e");
    expect(store.getters.searchForMealStr).toBe("e");
    store.commit("CHANGE_LOADING_STATUS", true);
    expect(store.getters.loading).toBe(true);
    expect(store.getters.mealItem).toStrictEqual([]);
    store.commit("SAVE_MEALS_RESPONSE", []);
    expect(store.getters.mealsResponse).toStrictEqual([]);
    store.commit("ERROR_RESPONSE", "Network Error");
    expect(store.getters.networkError).toStrictEqual(errorMessage);
  });

  test("Checking action get_random_meals functions ... !", async () => {
    store.dispatch("get_random_meals");
    const response = await getMealsDetails();
    store.commit("SAVE_SELECTED_MEAL_ITEM", response);
    expect(store.getters.mealItem).toEqual(response[0]);
  });

  test("Checking action get_meals_response functions ... !", async () => {
    store.dispatch("get_meals_response");
    const response = await searchMeal("Eton Mess");
    store.commit("SAVE_MEALS_RESPONSE", response);
    expect(store.getters.mealsResponse.length).toBe(response.length);
  });

  test("Checking action get_selected_meal_item functions ... !", async () => {
    store.dispatch("get_selected_meal_item");
    const response = await searchMeal("Eton Mess");
    store.commit("SAVE_SELECTED_MEAL_ITEM", response);
    expect(store.getters.mealItem).toEqual(response[0]);
  });
});
