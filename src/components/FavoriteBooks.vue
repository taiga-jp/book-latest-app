<template>
  <v-container>
    <h2>お気に入り書籍</h2>
    <v-row no-gutters>
      <v-col
        v-for="(item, i) in favoriteInfo"
        :key="i"
        cols="12"
        sm="2"
        class="mb-6 pa-2 d-flex flex-column align-center"
      >
        <img :src="item.thumb" class="mb-2" />
        <p class="mb-1">{{ item.title }}</p>
        <v-btn
          depressed
          color="primary"
          class="mt-auto mb-1"
          @click="
            getLatestBook(
              item.author,
              item.publisher,
              item.series,
              item.titleKana
            )
          "
          >最新刊表示</v-btn
        >
        <v-btn
          depressed
          color="error"
          class="mt-auto"
          @click="deleteFavoriteBooks(item.docId)"
          >削除</v-btn
        >
      </v-col>
    </v-row>
    <div v-if="latestFlag" class="latest-book">
      <div class="latest-book-item text-center">
        <p class="latest-book-item__heading mb-0 py-1">選択中の最新刊</p>
        <div class="latest-book-item__body py-4 px-2 text-center">
          <img :src="latestBook.thumb" class="mb-0" />
          <p class="mb-0">{{ latestBook.title }}</p>
        </div>
      </div>
    </div>
    <!-- <v-btn elevation="2" @click="getFavoriteBooks"
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
    </div> -->
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
      latestFlag: false,
      latestBook: {
        title: "",
        thumb: "https://placehold.jp/170x200.png",
        url: "",
      },
      db: firebase.firestore().collection("favorites"),
    };
  },
  created: function () {
    this.favoriteInfo = [];
    //firestore
    this.db.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        var favorite = {
          author: "",
          publisher: "",
          series: "",
          title: "",
          titleKana: "",
          thumb: "",
          url: "",
          docId: "",
        };
        favorite.author = doc.data().author;
        favorite.publisher = doc.data().publisher;
        favorite.series = doc.data().series;
        favorite.title = doc.data().title;
        favorite.titleKana = doc.data().titleKana;
        favorite.thumb = doc.data().thumb;
        favorite.url = doc.data().url;
        favorite.docId = doc.id;
        this.favoriteInfo.push(favorite);
      });
    });
  },
  methods: {
    async getFavoriteBooks() {
      for (let data of this.convertJsonFromObserver(this.favoriteInfo)) {
        await this.axios
          .get(
            `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&booksGenreId=001001&sort=-releaseDate&size=9&hits=1&author=${data.author}&publisherName=${data.publisher}&seriesName=${data.series}&titleKana=${data.title}&applicationId=1045645003595673397`
          )
          .then((response) => {
            this.favoriteBooks.push(response);
            console.log(data.title);
            return Promise.resolve(response);
          });
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      this.getFavoriteFlag = true;
    },
    convertJsonFromObserver(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    getLatestBook(author, publisher, series, title) {
      var searchData = {
        author: author.replace("/", " "),
        publisher: publisher.replace("/", " "),
        series: series.replace("/", " "),
        title: title.replace("/", " "),
      };
      this.axios
        .get(
          `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&booksGenreId=001001&sort=-releaseDate&size=9&hits=1&author=${searchData.author}&publisherName=${searchData.publisher}&seriesName=${searchData.series}&titleKana=${searchData.title}&applicationId=1045645003595673397`
        )
        .then((response) => {
          this.latestBook.title = response.data.Items[0].Item.title;
          this.latestBook.thumb = response.data.Items[0].Item.largeImageUrl;
          this.latestBook.url = response.data.Items[0].Item.itemUrl;
        });
      this.latestFlag = true;
    },
    deleteFavoriteBooks(docId) {
      this.favoriteInfo = [];
      this.db.doc(docId).delete();
    },
  },
};
</script>

<style>
.latest-book {
  position: fixed;
  top: 260px;
  right: 16px;
  min-width: 192px;
  max-width: 218px;
  background-color: #fff;
}

.latest-book-item {
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.latest-book-item__heading {
  border-bottom: 1px solid #d1d1d1;
}

.latest-book-item__body img {
  max-width: 152px;
}
</style>
