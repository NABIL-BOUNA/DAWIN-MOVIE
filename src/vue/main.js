import Vue from 'vue' //librairie "vue" dans node_modules
import routes from './routes.js'
import store from './store.js'
import app from './app.vue' //fichier app.vue local
import movieitem from "./components/movieitem.vue"
import StarRating from 'vue-star-rating'

Vue.component('movie-item', movieitem);
Vue.component('star-rating', StarRating);

// The usual app stuff goes here.
new Vue({
  el: '#app',
  render: h => h(app),
  store:store,
  router:routes
});