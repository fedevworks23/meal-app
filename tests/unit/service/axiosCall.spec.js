import axios from "axios";
import {
  _URL,
  getMealsDetails,
  searchMeal
} from "../../../src/service/axiosCall";

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe("Service/Axios Calls...!", () => {
  test("Axios call to Get random meal with Success Response...", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        "meals": [{}]
      }
    });
    await getMealsDetails().then((data) => {
      expect(data).toStrictEqual([{}]);
    });
  });

  test("Axios call to Get random meal with Error Response...", async () => {
    axios.get.mockRejectedValueOnce("Network error");
    await getMealsDetails().catch((e) => expect(e).toMatch("Network error"));
  });

  test("Axios call to Get meal on input with Success Response...", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        "meals": []
      }
    });
    await searchMeal().then((data) => {
      expect(data).toStrictEqual([]);
    });
  });

  test("Axios call to Get meal on input with Error Response...", async () => {
    axios.get.mockRejectedValueOnce("Network error");
    await searchMeal().catch((e) => expect(e).toMatch("Network error"));
  });

  test("Axios call to Get meal with Name with Success Response...", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        "meals": [{}]
      }
    });
    await searchMeal().then((data) => {
      expect(data).toStrictEqual([{}]);
    });
  });

  test("Axios call to Get meal with Name  with Error Response...", async () => {
    axios.get.mockRejectedValueOnce("Network error");
    await searchMeal().catch((e) => expect(e).toMatch("Network error"));
  });
});
