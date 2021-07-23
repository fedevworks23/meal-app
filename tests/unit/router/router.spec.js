import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import router from "../../../src/router/index.js";
import Home from "../../../src/views/Home.vue";
import Search from "../../../src/views/Search.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("App", () => {
  let state;
  let getters;
  let actions;
  let store;
  beforeEach(() => {
    state = {
      searchForMealStr: "",
      loading: true
    };

    getters = {
      searchForMealStr: () => state.searchForMealStr,
      loading: () => state.loading,
      mealItem: () => []
    };

    actions = {
      get_random_meals: jest.fn(),
      get_selected_meal_item: jest.fn()
    };

    store = new Vuex.Store({
      state,
      getters,
      actions
    });
  });

  test("Renders Home View via routing...", async () => {
    const wrapper = mount(Home, {
      store,
      localVue,
      router
    });
    router.push("/");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toBe("Home");
  });

  test("Renders Search View via routing...", async () => {
    const wrapper = mount(Search, {
      store,
      localVue,
      router
    });
    router.push("/search");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toBe("Search");
  });
});
