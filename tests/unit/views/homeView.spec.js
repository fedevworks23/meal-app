import { mount, createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import Vuex from "vuex";
import Home from "../../../src/views/Home.vue";
import LoadingPage from "../../../src/components/LoadingPageComponent.vue";
import MealsDetails from "../../../src/components/MealsDetails.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

let state;
let getters;
let actions;
let mutations;
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

  mutations = {
    CHANGE_LOADING_STATUS(state, data) {
      state.loading = data;
    }
  };

  store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  });
});

function factory() {
  return mount(Home, {
    store,
    localVue,
    mocks: {
      $route: {
        params: {
          mealName: "Eton Mess"
        }
      }
    }
  });
}

describe("Home.vue", () => {
  test("Checking Loading response from getters ... !", () => {
    const loading = true;
    expect(loading).toBe(getters.loading());
  });

  test("Checking Random Meal response from getters ... !", () => {
    const mealItem = [];
    expect(mealItem).toStrictEqual(getters.mealItem());
  });

  test("if loading component is false, show MealsDetails component...", () => {
    store.commit("CHANGE_LOADING_STATUS", false);
    const wrapper = factory();
    expect(wrapper.findComponent(LoadingPage).exists()).toBe(false);
    expect(wrapper.findComponent(MealsDetails).exists()).toBe(true);
  });
});
