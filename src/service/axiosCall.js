import axios from "axios";
import store from "@/store";

export const _URL = "https://www.themealdb.com/api/json/v1/1";

export const getMealsDetails = async () => {
  return await axios
    .get(_URL + "/random.php")
    .then(response => {
      return response.data.meals;
    })
    .catch(error => {
      store.commit("ERROR_RESPONSE", error);
    });
};

export const searchMeal = async userQuery => {
  return await axios
    .get(_URL + "/search.php?s=" + userQuery)
    .then(response => {
      return response.data.meals;
    })
    .catch(error => {
      store.commit("ERROR_RESPONSE", error);
    });
};
