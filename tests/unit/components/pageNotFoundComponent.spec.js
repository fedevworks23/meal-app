import { mount } from "@vue/test-utils";
import PageNotFound from "../../../src/components/PageNotFound.vue";

describe("PageNotFound Component", () => {
  test("test should render PageNotFound", async () => {
    const wrapper = mount(PageNotFound);
    const message = "PageNotFound";

    expect(wrapper.find(".page-not-found").text()).toBe(message);
  });
});
