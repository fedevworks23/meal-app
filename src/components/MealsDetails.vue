<template>
  <div class="random-meal">
    <section>
      <div class="container">
        <div class="meal-content">
          <div class="meal-content-text">
            <h2 class="meal-title">{{ meals.strMeal }}</h2>
            <p class="meal-sub-title">Instructions</p>
            <p class="meal-content-block" v-html="meals.strInstructions"></p>
            <p class="meal-sub-title">Ingredients & Measures</p>
            <table class="meal-content-block">
              <tr>
                <th>Ingredients</th>
                <th>Measures</th>
              </tr>
              <tr v-for="(i, index) in formIngredientsList" :key="index">
                <td>{{ i.strIngredient }}</td>
                <td>{{ i.strMeasure }}</td>
              </tr>
            </table>

            <a :href="meals.strYoutube" class="receipe-video-button"
              >Watch Receipe Video</a
            >
          </div>
          <div class="meal-content-img">
            <img :src="meals.strMealThumb" :alt="meals.strMeal" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MealsDetails",
  props: ["MealsDetails"],
  data() {
    return {
      meals: this.MealsDetails
    };
  },
  computed: {
    formIngredientsList() {
      let ingredientAndMeasuresArr = [];
      let count = 1;
      Object.keys(this.meals).forEach(k => {
        if (
          (k.match(/strIngredient/g) || k.match(/strMeasure/g)) &&
          this.meals["strIngredient" + count] !== ""
        ) {
          ingredientAndMeasuresArr.push({
            strIngredient: this.meals["strIngredient" + count],
            strMeasure: this.meals["strMeasure" + count]
          });
          count++;
        }
      });
      return ingredientAndMeasuresArr;
    }
  }
};
</script>

<!-- Addied "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
section {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1.7rem 0;

  .container {
    max-width: 120rem;
    padding: 0 1.5rem;
    margin: 0 auto;

    .meal-content {
      display: flex;

      .meal-content-img {
        flex: 1;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
          box-shadow: 0px 0px 2px #000;
          position: sticky;
          top: 1%;
          border: 2px solid #fff;
        }
      }

      .meal-content-text {
        flex: 2;
        padding: 1.5rem;
        text-align: center;
        background-color: #fff;
        box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5);

        .meal-title {
          text-align: center;
          color: #222;
          font-size: 1.8rem;
        }

        .meal-sub-title {
          font-size: 1.1rem;
          margin: 1rem 0;
          text-align: left;
          font-weight: 600;
        }

        .meal-content-subtitle {
          font-size: 2.56rem;
          font-weight: 400;
          text-transform: uppercase;
          color: #444;
          margin: 0.5rem 0 2rem;
        }

        .meal-content-block {
          font-size: 0.8rem;
          margin-bottom: 1rem;
          text-align: justify;
          width: 100%;

          tr td {
            text-transform: capitalize;
          }
        }

        .receipe-video-button {
          display: inline-block;
          text-decoration: none;
          font-size: 0.8rem;
          text-transform: uppercase;
          padding: 0.8rem 2rem;
          border: 1px solid #444;
          color: #444;

          &:hover {
            color: #fff;
            background: linear-gradient(
              to bottom left,
              #42b983 40%,
              #56b88b 100%
            );
            transition: 0.2s ease-in;
            border: 1px solid transparent;
            border-radius: 5px;
          }
        }
      }
    }
  }
}

// 480px;
@media (max-width: 30rem) {
  .meal-content-text {
    .meal-content-block {
      font-size: 1.2rem;
    }

    .meal-content-subtitle {
      font-size: 1.72rem;
    }

    .meal-title {
      font-size: 2.7rem;
    }
  }
}

// 786px;
@media (max-width: 48rem) {
  .meal-content {
    flex-direction: column-reverse;
    text-align: center;
    .meal-content-text {
      .meal-content-block {
        text-align: justify;
      }
    }
  }

  section .container .meal-content .meal-content-img img {
    height: 15rem;
    width: 100%;
  }
}

// 1024px;
@media (max-width: 64rem) {
  .meal-content-text {
    .meal-content-block {
      font-size: 1.4rem;
      margin-bottom: 1.6rem;
    }

    .meal-content-subtitle {
      font-size: 2rem;
    }

    .meal-title {
      font-size: 3.2rem;
    }

    .receipe-video-button {
      padding: 1rem 1.56rem;
    }
  }
}
</style>
