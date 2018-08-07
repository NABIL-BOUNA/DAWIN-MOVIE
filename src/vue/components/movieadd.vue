<template>
<div class="container-fluid">
<div class="row text-center">
  <br>
  <br>
  <form class="form-horizontal">
    <h1 class="text-center">Film</h1>
    <div class="row">
      <div class="form-group">
        <label class="col-md-3 control-label" for="film">Titre</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="film" name="film" type="text" placeholder="titre de film" v-model="newmovie.title">
        </div>
      </div>
      <br>
      <!-- Text input-->
      <div class="form-group">
        <label class="col-md-3 control-label" for="year">Année de sortie</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="year" name="year" type="text" placeholder="Année de sortie du film" v-model="newmovie.year">
        </div>
      </div>
      <br>
      <!-- Text input-->
      <div class="form-group">
        <label class="col-md-3 control-label" for="langue">Langue</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="langue" name="langue" type="text" placeholder="Langue du film" v-model="newmovie.langue">
        </div>
      </div>
      <br>
      <h1 class="text-center">Réalisateur</h1>
      <br>
      <!-- Text input-->
      <div class="form-group">
        <label class="col-md-3 control-label" for="nom">Nom</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="nom" name="nom" type="text" placeholder="Nom de réalisateur du film" v-model="newmovie.realisateur.nom">
        </div>
      </div>
      <br>
      <!-- Text input-->
      <div class="form-group">
        <label class="col-md-3 control-label" for="prenom">Prénom</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="prenom" name="prenom" type="text" placeholder="Prenom de réalisateur du film" v-model="newmovie.realisateur.prenom">
        </div>
      </div>
      <br>
      <!-- Text input-->
      <div class="form-group">
        <label class="col-md-3 control-label" for="nationalite">Nationalité</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="nationalite" name="nationalite" type="text" placeholder="Nationalité de réalisateur du film" v-model="newmovie.realisateur.nationalite">
        </div>
      </div>
      <br>
      <!-- Text input-->
      <div class="form-group">
        <label class="col-md-3 control-label" for="datenaissance">Date de naissance</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="datenaissance" name="datenaissance" type="text" placeholder="Date de naissance de réalisateur du film" v-model="newmovie.realisateur.datenaissance">
        </div>
      </div>
      <br>
      <br>
      <h1 class="text-center">Genre du film</h1>
      <br>
      <!-- Text input-->
      <div class="form-group">
        <label class="col-md-3 control-label" for="genre">Genre</label>
        <div class="col-md-6">
          <input class="form-control input-md" id="genre" name="genre" type="text" placeholder="Genre du film" v-model="newmovie.genre">
        </div>
      </div>
      <br>
    </div>
  </form>
  <form id="uploadForm" enctype="multipart/form-data" method="post">
    <label class="col-md-3 control-label" for="avatar">Poster</label>
    <div class="col-md-6">
    <input type="file" name="avatar" id="avatar" class="form-control input-md"/>
      <b>(optional)</b>
    </div>
  </form>
  <br>
  <br>
  <br>
<button class="btn btn-primary" v-on:click="addnewmovie">
  <b>+</b>&nbsp;Ajouter
</button>
<button class="btn btn-warning" id="Annuler" type="button" v-on:click="Annuler">
    Annuler
</button>
</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    mounted: function() {
        this.$store.dispatch("allmovies")
    },
    computed: mapState ({
        movies: state => state.movies,
        newmovie: state => state.newmovie[0]
    }),
  methods: {
    Annuler() {
      this.$router.push({ name: 'home' });
    },
    addnewmovie() {
          if(document.getElementById("film").value!=""&&document.getElementById("year").value!=""&&document.getElementById("langue").value!=""&&document.getElementById("nom").value!=""&&document.getElementById("prenom").value!=""&&document.getElementById("nationalite").value!=""&&document.getElementById("datenaissance").value!=""&&document.getElementById("genre").value!="")
          {
              axios.get(encodeURI('http://www.omdbapi.com/?t='+this.newmovie.title+'&y='+this.newmovie.year+'&apikey=78dcf2f3')).then(response =>{
                  this.newmovie.avatar = response.data.Poster;
                  this.$store.dispatch('Ajouter', this.newmovie);
                  if(document.getElementById("avatar").files.length == 1){
                      this.$router.push({ name: 'home' });
                  }
              });

              if(document.getElementById("avatar").files.length != 0){
                  document.getElementById("uploadForm").action = ["/api/upload/"];
                  document.getElementById("uploadForm").submit();
              }

          }else{
              alert("veuillez remplir tous les champs");
          }
     }

  }
};
</script>

<style>
</style>