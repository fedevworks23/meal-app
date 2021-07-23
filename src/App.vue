<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Recipe</router-link>
      |
      <router-link to="/search">Search</router-link>
    </div>
    <hr />
    <br />
    <error-page
      v-if="networkError.status"
      :error-message="networkError"
    ></error-page>
    <router-view v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ErrorPageComponent from "./components/ErrorPageComponent.vue";

export default {
  name: "App",
  components: {
    "error-page": ErrorPageComponent
  },
  computed: {
    ...mapState(["networkError"])
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Quicksand:400,700");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background: #ededed;
  font-family: "Quicksand", serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  padding: 1rem;
  height: 100vh;
  width: 100%;
  background-color: #333;
  color: #272727;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}

#nav {
  padding: 15px;
  text-align: center;

  a {
    font-weight: bold;
    color: #42b983;
    padding: 8px;
    border-radius: 5px;
    text-decoration-line: none;

    &.router-link-exact-active {
      color: #ededed;
      background: #42b983;
    }

    &:hover {
      padding: 7px;
      border: 1px solid #42b983;
    }
  }
}

hr {
  background: #42b983;
  height: 1px;
  border-width: 0;
}
</style>
