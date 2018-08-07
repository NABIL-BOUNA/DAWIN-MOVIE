import Vue from 'vue';
import VueRouter from 'vue-router';
import ModelsComponent from "./components/models.vue";
import MovieAddComponent from "./components/movieadd.vue";
import MovieEditComponent from "./components/movieedit.vue";
import MovieDetailsComponent from "./components/moviedetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: ModelsComponent
  }, {
    path: "/movie/:id/edit",
    name: "edit",
    component: MovieEditComponent
  }
  , {
    path: "/add",
    name: "add",
    component: MovieAddComponent
  }
  , {
    path: "/movie/:id",
    name: "details",
    component: MovieDetailsComponent
  }
];

export default new VueRouter({
    routes ,
});