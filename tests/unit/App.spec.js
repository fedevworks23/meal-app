import { mount, createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import Vuex from "vuex";
import VueRouter from "vue-router";
import router from "../../src/router/index.js";
import store from "../../src/store/index";
import { getMealsDetails } from "../../src/service/axiosCall";
import App from "../../src/App.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("App.spec.vue", () => {
  test("get_random_meals response on created hook ... !", async () => {
    const wrapper = mount(App, { store, localVue, router });
    store.dispatch("get_random_meals");
    const response = await getMealsDetails();
    store.commit("SAVE_SELECTED_MEAL_ITEM", response);
    expect(store.getters.mealItem).toEqual(response[0]);
  });
});
