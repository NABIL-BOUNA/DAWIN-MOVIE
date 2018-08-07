<template>
<div class="container-fluid" v-if="mymovie!=null">
<div class="row text-center">
  <br>
  <br>
<form class="form-horizontal">
  <h1 class="text-center">Film</h1>
  <div class="row">
  <div class="form-group">
  <label class="col-md-3 control-label" for="film">Titre</label>
  <div class="col-md-6">
  <input class="form-control input-md" id="film" name="film" type="text" placeholder="Titre de film" v-model="mymovie.title">
  </div>
  </div>
  <br>
    <!-- Text input-->
    <div class="form-group">
      <label class="col-md-3 control-label" for="year">Année de sortie</label>
      <div class="col-md-6">
        <input class="form-control input-md" id="year" name="year" type="text" placeholder="Année de sortie du film" v-model="mymovie.year">
      </div>
    </div>
    <br>
    <!-- Text input-->
    <div class="form-group">
      <label class="col-md-3 control-label" for="langue">Langue</label>
      <div class="col-md-6">
        <input class="form-control input-md" id="langue" name="langue" type="text" placeholder="Langue du film" v-model="mymovie.langue">
      </div>
    </div>
    <br>
    <h1 class="text-center">Réalisateur</h1>
    <br>
  <!-- Text input-->
  <div class="form-group">
  <label class="col-md-3 control-label" for="nom">Nom</label>
  <div class="col-md-6">
  <input class="form-control input-md" id="nom" name="nom" type="text" placeholder="Nom de réalisateur du film" v-model="mymovie.realisateur.nom">
  </div>
  </div>
  <br>
    <!-- Text input-->
    <div class="form-group">
      <label class="col-md-3 control-label" for="prenom">Prénom</label>
      <div class="col-md-6">
        <input class="form-control input-md" id="prenom" name="prenom" type="text" placeholder="Prenom de réalisateur du film" v-model="mymovie.realisateur.prenom">
      </div>
    </div>
    <br>
    <!-- Text input-->
    <div class="form-group">
      <label class="col-md-3 control-label" for="nationalite">Nationalité</label>
      <div class="col-md-6">
        <input class="form-control input-md" id="nationalite" name="nationalite" type="text" placeholder="Nationalité de réalisateur du film" v-model="mymovie.realisateur.nationalite">
      </div>
    </div>
    <br>
    <!-- Text input-->
    <div class="form-group">
      <label class="col-md-3 control-label" for="datenaissance">Date de naissance</label>
      <div class="col-md-6">
        <input class="form-control input-md" id="datenaissance" name="datenaissance" type="text" placeholder="Date de naissance de réalisateur du film" v-model="mymovie.realisateur.datenaissance">
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
        <input class="form-control input-md" id="genre" name="genre" type="text" placeholder="Genre du film" v-model="mymovie.genre">
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
<button class="btn btn-primary" type="button" v-on:click="editmyMovie">
  <span class="glyphicon glyphicon-edit"></span>&nbsp;Modifier
</button>
<router-link class="btn btn-info" :to="{ name: 'details' , params: { id: this.$route.params.id } }">
    <span class="glyphicon glyphicon-eye-open"></span>&nbsp;Annuler
 </router-link>
</div>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    computed: mapState ({
        mymovie: state => state.mymovie
    }),
    methods: {
        editmyMovie() {
            if(document.getElementById("film").value!=""&&document.getElementById("year").value!=""&&document.getElementById("langue").value!=""&&document.getElementById("nom").value!=""&&document.getElementById("prenom").value!=""&&document.getElementById("nationalite").value!=""&&document.getElementById("datenaissance").value!=""&&document.getElementById("genre").value!="")
            {
                if(document.getElementById("avatar").files.length == 1){
                    this.$store.dispatch('Modifier', { movie:this.mymovie, id:this.$route.params.id } );
                     document.getElementById("uploadForm").action = ["/api/upload/", this.$route.params.id].join("");
                     document.getElementById("uploadForm").submit();
                }
                else{
                    axios.get(encodeURI('http://www.omdbapi.com/?t='+this.mymovie.title+'&y='+this.mymovie.year+'&apikey=78dcf2f3')).then(response =>{
                        this.mymovie.avatar = response.data.Poster;
                        this.$store.dispatch('Modifier', { movie:this.mymovie, id:this.$route.params.id } );
                        this.$router.push({ name: 'home' });
                    });
                }
            }else{
                alert("Veuillez remplir tous les champs !");
            }
        },
    },
    mounted: function() {
        this.$store.dispatch("onemovies", this.$route.params.id)
    }
};
</script>

<style>
</style>