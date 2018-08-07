import Vue from 'vue' //librairie "vue" dans node_modules
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      movies: null,
      mymovie: null,
      newmovie: [{
          id:0,
          title: "",
          year: 2018,
          langue:"",
          avatar:"",
          realisateur: {
              nom:"",
              prenom:"",
              nationalite:"",
              datenaissance:1975
          },
          genre:""
      }],
      recherchetxt: ""
  },
  mutations: {
      fillmovies(state, items){
          state.movies = items;
      },
      fillmovie(state, items){
          state.mymovie = items;
      },
  },
    actions: {
        allmovies(context) {
            axios.get('/api/movies/all').then(response =>{
                context.commit('fillmovies', response.data)
            })
        },
        onemovies(context, id) {
            axios.get('/api/movies/'.concat(id)).then(response =>{
                context.commit('fillmovie', response.data);
            })
        },
        Ajouter(context, movie) {
            axios.post('/api/movies', movie);
        },
        Modifier(context, {movie, id}) {
            axios.post('/api/movies/'.concat(id), movie);
        },
        setRating(context, {rating, id}) {
            axios.post('/api/movies/rating/'.concat(id)+'/'.concat(rating));
        },
        Supprimer(context, id) {
            axios.post('/api/movies/delete/'.concat(id));
        }
    }
});
