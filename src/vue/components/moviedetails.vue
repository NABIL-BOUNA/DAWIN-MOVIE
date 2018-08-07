<template>
<div class="container-fluid" v-if="mymovie!=null">
  <div class="row text-center">
    <div class="col-md-12 text-center">
      <h1><b>{{mymovie.title}}</b></h1>
    </div>
    <div class="col-md-3 text-center">
      <img class="img-responsive thumbnail" v-bind:src="mymovie.avatar">
    </div>
  <div class="col-md-9 text-left">
    <star-rating :rating="parseFloat(mymovie.rating)" :increment="0.5" :star-size="38" :max-rating="5" :show-rating="false" @rating-selected="setRating"></star-rating>
   <div class="text-left"><h1><b>Année de sortie : {{mymovie.year}}</b></h1></div>
    <div class="text-left"><h1><b>Langue : {{mymovie.langue}}</b></h1></div>
  <div class="text-left"><h1><b>Réalisateur :</b></h1>
    <ul>
      <li><h1><b>Nom / Prénom : {{mymovie.realisateur.nom}} {{mymovie.realisateur.prenom}}</b></h1></li>
      <li><h1><b>Nationalité : {{mymovie.realisateur.nationalite}}</b></h1></li>
      <li><h1><b>Date de naissance : {{mymovie.realisateur.datenaissance}}</b></h1></li>
    </ul>
  </div>
    <div class="text-left"><h1><b>Genre du film : {{mymovie.genre}}</b></h1></div>
  </div>
    <div class="col-md-12 text-center">
      <br>
      <br>
      <router-link class="btn btn-info" :to="{ name: 'home'}">
        <span class="glyphicon glyphicon-eye-open"></span>&nbsp;voire tous les films
      </router-link>
      <router-link class="btn btn-warning btn-sm" :to="{ name: 'edit' , params: this.$route.params }">
        <span class="glyphicon glyphicon-edit"></span>&nbsp;Modifier
      </router-link>
      <a class="btn btn-danger btn-sm" v-on:click="supprimermovie">
        <span class="glyphicon glyphicon-remove"></span>&nbsp;Supprimer
      </a>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return {
            rating: "No Rating Selected",
        };
    },
    computed: mapState ({
        mymovie: state => state.mymovie
    }),
    methods: {
        supprimermovie() {
            if (confirm("voulez vous supprimer ce film !")) {
                this.$store.dispatch('Supprimer', this.$route.params.id);
                this.$router.push({ name: 'home' });
            }
        },
        setRating: function(rating){
            this.rating=rating;
            this.$store.dispatch('setRating', {rating:this.rating,id:this.$route.params.id});
        }
    },
    mounted: function() {
        this.$store.dispatch("onemovies", this.$route.params.id)
    }
};
</script>

<style>
</style>