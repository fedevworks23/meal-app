import { mount, createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import Vuex from "vuex";
import Search from "../../../src/views/Search.vue";
import SearchMeal from "../../../src/components/SearchMeal.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Search View...!", () => {
  let state;
  let getters;
  let store;
  beforeEach(() => {
    state = {
      searchForMealStr: "",
      loading: true
    };

    getters = {
      searchForMealStr: () => state.searchForMealStr,
      loading: () => state.loading,
      mealsResponse: () => []
    };

    store = new Vuex.Store({
      state,
      getters
    });
  });

  function factory() {
    return mount(Search, { store, localVue });
  }

  test("Check if Search View is exits...!", () => {
    const wrapper = factory();
    expect(wrapper.find(".search").exists()).toBe(true);
  });

  test("check if child SearchMeal Component loaded...!'", () => {
    const wrapper = factory();
    expect(wrapper.findComponent(SearchMeal).exists()).toBe(true);
  });
});
