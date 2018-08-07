<template>
<div class="container" v-if="movies!=null">
    <div class="row text-center">
        <div class="col-sm-offset-4 col-sm-4">
            <div class="form-group">
                <input class="form-control" id="search" name="search" type="search" placeholder="recherche un film ..." v-model="recherchetxt">
            </div>
        </div>
    </div>
    <div class="row text-center">
      <!-- movie.realisateur,movie.title,movie.year -->
        <movie-item v-for="movie in recherche" v-bind:movie="movie"></movie-item>
    </div>
</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                recherchetxt: ""
            };
        },
        mounted: function() {
            this.$store.dispatch("allmovies")
        },
        computed: mapState ({
            movies: state => state.movies,
            recherche: function() {
                return this.movies.filter(x => {
                    if (this.recherchetxt.toLowerCase() == null) {
                        return x;
                    } else if (x.title.toLowerCase().includes(this.recherchetxt.toLowerCase())) {
                        return x;
                    } else if (x.realisateur.nom.toLowerCase().includes(this.recherchetxt.toLowerCase())) {
                        return x;
                    } else if (x.realisateur.prenom.toLowerCase().includes(this.recherchetxt.toLowerCase())) {
                        return x;
                    }
                });
            }
        }),
    };
</script>

<style>
</style>