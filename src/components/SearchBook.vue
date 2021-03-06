<template>
  <v-container>
    <div class="mb-12 pt-6 px-4">
      <v-text-field label="書籍名" v-model="keywords"></v-text-field>
      <div class="text-right">
        <v-btn elevation="2" @click="getSearchBooks">検索</v-btn>
      </div>
    </div>
    <div v-if="getFlag" class="mb-16">
      <h2>検索結果</h2>
      <v-row no-gutters>
        <v-col
          v-for="item in info.data.Items"
          :key="item.isbn"
          cols="12"
          sm="2"
          class="search-item mb-6 pa-2 d-flex flex-column align-center"
        >
          <img :src="item.Item.largeImageUrl" class="mb-2" />
          <p class="mb-1">{{ item.Item.title }}</p>
          <v-btn
            depressed
            color="primary"
            class="mt-auto"
            @click="
              addBooks(
                item.Item.author,
                item.Item.publisherName,
                item.Item.seriesName,
                item.Item.title,
                item.Item.titleKana,
                item.Item.largeImageUrl,
                item.Item.itemUrl
              )
            "
            >お気に入り</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "SearchBook",
  data() {
    return {
      getFlag: false,
      keywords: "",
      bookData: [],
      info: null,
      db: firebase.firestore().collection("favorites"),
    };
  },
  methods: {
    getSearchBooks() {
      this.axios
        .get(
          `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${this.keywords}&booksGenreId=001001&sort=sales&applicationId=1045645003595673397&size=9`
        )
        .then((response) => {
          this.info = response;
          this.getFlag = true;
        });
    },
    addBooks(author, publisher, series, title, titleKana, thumb, url) {
      const addData = {
        author: author,
        publisher: publisher,
        series: series,
        title: title,
        titleKana: titleKana,
        thumb: thumb,
        url: url,
      };

      this.db
        .add(addData)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
  },
};
</script>

<style>
</style>
