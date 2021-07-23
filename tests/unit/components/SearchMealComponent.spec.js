import { mount, createLocalVue } from "@vue/test-utils";
import "@testing-library/jest-dom";
import Vuex from "vuex";
import SearchMeal from "../../../src/components/SearchMeal.vue";
import LoadingPage from "../../../src/components/LoadingPageComponent.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("SearchMealComponent.spec.js", () => {
  let state;
  let getters;
  let actions;
  let mutations;
  let store;

  beforeEach(() => {
    state = {
      searchForMealStr: "",
      loading: true,
      mealsResponse: []
    };

    getters = {
      searchForMealStr: () => state.searchForMealStr,
      loading: () => state.loading,
      mealsResponse: () => state.mealsResponse
    };

    actions = {
      get_meals_response: jest.fn(),
      get_selected_meal_item: jest.fn()
    };

    mutations = {
      UPDATE_SEARCH_STRING: jest.fn()
    };

    store = new Vuex.Store({
      state,
      getters,
      actions,
      mutations
    });
  });

  test("Show Loading Component loading if user searching for a meal ... !", () => {
    const wrapper = mount(SearchMeal, { store, localVue });
    expect(true).toBe(getters.loading());
    expect(wrapper.findComponent(LoadingPage).exists()).toBe(true);
  });

  test("Show No results found message, if meals response is empty...!", () => {
    store.state.loading = false;
    store.state.searchForMealStr = "q";
    const wrapper = mount(SearchMeal, {
      store,
      localVue,
      computed: {
        ifResponseIsEmpty() {
          return (
            store.getters.searchForMealStr.length && store.getters.mealsResponse
          );
        }
      }
    });
    expect(wrapper.findComponent(LoadingPage).exists()).toBe(false);
    expect(wrapper.find(".errorText").text()).toBe(
      "No results found for Meal \"q\""
    );
  });

  test("Clear Search List if input is empty...!", () => {
    store.state.loading = false;
    store.state.searchForMealStr = "";
    store.state.mealsResponse = [
      {
        strMeal: "Eton Mess",
        strInstructions: "Instructions",
        strMealThumb: "image.jpg",
        strYoutube: "link",
        strIngredient1: "strawberries",
        strMeasure1: "500g"
      }
    ];
    const wrapper = mount(SearchMeal, {
      store,
      localVue
    });
    expect(wrapper.findComponent(LoadingPage).exists()).toBe(false);
    expect(wrapper.find(".errorText").exists()).toBe(false);
    expect(wrapper.find(".main-container").exists()).toBe(false);
  });

  test("Search for a Meal and Select ...!", async () => {
    // Mock Function
    const searchForMealFunc = jest.fn();
    const showSelectedMealDetails = jest.fn();

    // Getting Props using Store Update
    store.state.loading = false;
    store.state.searchForMealStr = "e";
    store.state.mealsResponse = [
      {
        strMeal: "Eton Mess",
        strInstructions: "Instructions",
        strMealThumb: "image.jpg",
        strYoutube: "link",
        strIngredient1: "strawberries",
        strMeasure1: "500g"
      }
    ];

    // Route Mock
    const push = jest.fn();

    const wrapper = mount(SearchMeal, {
      store,
      localVue,
      mocks: {
        $router: {
          push: push
        }
      }
    });

    await wrapper.find("input").trigger("input");
    expect(searchForMealFunc.mock.calls.length).toBe(0);
    expect(actions.get_meals_response.mock.calls.length).toBe(1);

    await wrapper.find(".card_btn").trigger("click");
    expect(showSelectedMealDetails.mock.calls.length).toBe(0);
    expect(push).toHaveBeenCalledWith({
      name: "Home",
      params: {
        mealName: "Eton Mess"
      }
    });
  });
});
