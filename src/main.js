import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAWH7LEqf5CKxpmcapxRs0MZsGbTt7o1yw",
  authDomain: "book-latest-app.firebaseapp.com",
  projectId: "book-latest-app",
  storageBucket: "book-latest-app.appspot.com",
  messagingSenderId: "86998943166",
  appId: "1:86998943166:web:765b330cc5eae5594665ef"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')