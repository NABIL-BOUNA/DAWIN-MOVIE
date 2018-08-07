<template>
  <div class="col-lg-3 col-md-3" v-if="$route.name=='home'">
    <div class="panel panel-info panel-sm">
      <div class="panel-heading panel-heading-sm">
        <router-link :to="{ name: 'details' , params: { id: movie._id } }">
          <h3 class="panel-title">{{movie.title}}</h3>
        </router-link>
      </div>
      <div class="panel-body text-center">
        <router-link class="thumbnail" :to="{ name: 'details' , params: { id: movie._id  } }">
          <img class="text-center" v-bind:src="movie.avatar">
        </router-link>
        <p><i class="glyphicon glyphicon-tag"></i>&nbsp;by {{movie.realisateur.nom}} {{movie.realisateur.prenom}} </p>
        <star-rating :rating="parseFloat(movie.rating)" :increment="0.5" :star-size="38" :show-rating="false" :read-only=true></star-rating>
         <p>Sortie à {{movie.year}}</p>
    </div>
      <router-link class="list-group-item list-group-item-default active text-center" :to="{ name: 'details' , params: { id: movie._id } }">
        <span class="glyphicon glyphicon-eye-open"></span>&nbsp;Voir
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"]
};
</script>

<style>
</style>