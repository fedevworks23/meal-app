import { mount } from "@vue/test-utils";
import "@testing-library/jest-dom";
import MealsDetails from "../../../src/components/MealsDetails.vue";

describe("MealsDetails Component...!", () => {
  test("check if child MealsDetails component loaded", () => {
    const wrapper = mount(MealsDetails, {
      data() {
        return {
          meals: {
            strMeal: "Eton Mess",
            strInstructions: "Instrutions",
            strMealThumb: "image.jpg",
            strYoutube: "link",
            strIngredient1: "strawberries",
            strMeasure1: "500g"
          }
        };
      }
    });
    expect(wrapper.find(".random-meal").exists()).toBe(true);
    expect(wrapper.find(".container").element).toBeVisible();
  });
});
