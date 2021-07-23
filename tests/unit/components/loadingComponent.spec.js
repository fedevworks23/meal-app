import { mount } from "@vue/test-utils";
import LoadingPageComponent from "../../../src/components/LoadingPageComponent.vue";

describe("LoadingPageComponent Component", () => {
  test("test should render LoadingPageComponent", async () => {
    const wrapper = mount(LoadingPageComponent);
    expect(wrapper.find(".loader-component").text()).toBe("Loader Page Component");
  });
});
