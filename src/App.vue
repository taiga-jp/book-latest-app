<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <SearchBook />
      <FavoriteBooks />
    </v-main>
  </v-app>
</template>

<script>
import SearchBook from "./components/SearchBook";
import FavoriteBooks from "./components/FavoriteBooks";

export default {
  name: "App",

  components: {
    SearchBook,
    FavoriteBooks,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@media screen and (min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
}

h2 {
  font-size: 26px;
  text-align: center;
  margin-bottom: 40px;
}
</style>
