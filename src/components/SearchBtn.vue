<template>
  <v-container>
    <div>
      <v-text-field label="書籍名" v-model="keywords"></v-text-field>
      <v-btn elevation="2" @click="getApi">取得</v-btn>
    </div>
    <div v-if="getFlag">
      <ul>
        <li v-for="item in info.data.Items" :key="item.isbn">
          <img :src="item.Item.largeImageUrl" />
          <p>{{ item.Item.title }}</p>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "SearchBtn",
  data() {
    return {
      getFlag: false,
      keywords: "",
      bookData: [],
      info: null,
    };
  },
  methods: {
    getApi() {
      this.axios
        .get(
          `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${this.keywords}&booksGenreId=001001&sort=sales&applicationId=1045645003595673397`
        )
        .then((response) => {
          this.info = response;
          this.getFlag = true;
        });
    },
  },
};
</script>
