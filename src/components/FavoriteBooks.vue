<template>
  <v-container>
    <v-btn elevation="2" @click="getFavoriteBooks"
      >お気に入り書籍の最新刊</v-btn
    >
    <div v-if="getFavoriteFlag">
      <v-row no-gutters>
        <v-col
          v-for="(item, i) in favoriteBooks"
          :key="i"
          cols="12"
          sm="2"
          class="mb-6 pa-2 d-flex flex-column align-center"
        >
          <img :src="item.data.Items[0].Item.largeImageUrl" class="mb-2" />
          <p class="mb-1">{{ item.data.Items[0].Item.title }}</p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "FavoliteBooks",
  data() {
    return {
      favoriteBooks: [],
      favoriteInfo: [],
      infos: [],
      getFavoriteFlag: false,
      db: firebase.firestore().collection("favorites"),
    };
  },
  created: function () {
    //firestore
    this.db.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        var favorite = {
          author: "",
          publisher: "",
          series: "",
          title: "",
        };
        favorite.author = doc.data().author;
        favorite.publisher = doc.data().publisher;
        favorite.series = doc.data().series;
        favorite.title = doc.data().title;
        this.favoriteInfo.push(favorite);
      });
    });
  },
  methods: {
    getFavoriteBooks() {
      this.convertJsonFromObserver(this.favoriteInfo).forEach((data) => {
        this.axios
          .get(
            `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&booksGenreId=001001&sort=-releaseDate&size=9&hits=1&author=${data.author}&publisherName=${data.publisher}&seriesName=${data.series}&titleKana=${data.title}&applicationId=1045645003595673397`
          )
          .then((response) => {
            this.favoriteBooks.push(response);
            console.log(data.title);
          });
      });
      this.getFavoriteFlag = true;
    },
    convertJsonFromObserver(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  },
};
</script>

<style>
</style>
