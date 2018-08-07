# movie_project

> Movie Website by NABIL BOUNA
> Using VueJS and NodeJS and AJAX and RESTFUL

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Créez un fichier package.json

    {
    	"name": "DAWIN-Movie",
    	"description": "DAWIN Movie Website VueJS NodeJS AJAX RESTFUL",
    	"version": "1.0.0",
    	"author": "<nabil.bouna.1@gmail.com>",
    	"dependencies": {
    		"babel-core": "^6.26.3",
    		"babel-loader": "^7.1.4",
    		"babel-preset-env": "^1.6.1",
    		"babel-preset-stage-3": "^6.24.1",
    		"css-loader": "^0.28.11",
    		"file-loader": "^1.1.11",
    		"vue": "^2.5.16",
    		"vue-loader": "^14.2.2",
    		"vue-router": "^3.0.1",
    		"vue-template-compiler": "^2.5.16",
    		"webpack": "^3.12.0"
    	},
    	"devDependencies": {
    		"webpack-dev-server": "^2.11.2"
    	}
    }

# Installez npm :

npm install

# Installez vue :

    npm install vue

# Installez webpack :

    npm install webpack

# Installez les dépendances nécessaires pour compiler un projet Vue.js :

npm install --save babel-core babel-loader babel-preset-env babel-preset-stage-3 css-loader file-loader vue-loader vue-template-compiler webpack webpack-dev-server

|_ package.json
|_ webpack.config.js
|_ index.html
|_ src/
|_ main.js
|_ app.vue

#Créez webpack.config.js

var path = require('path')
var webpack = require('webpack')

module.exports = {
entry: './src/main.js',
output: {
path: path.resolve(\_\_dirname, './dist'),
publicPath: '/dist/',
filename: 'build.js'
},
module: {
rules: [
{
test: /\.css$/,
use: [
'vue-style-loader',
'css-loader'
],
},
{
test: /\.vue$/,
loader: 'vue-loader',
options: {
loaders: {
}
// other vue-loader options go here
}
},
{
test: /\.js$/,
loader: 'babel-loader',
exclude: /node_modules/
},
{
test: /\.(png|jpg|gif|svg)$/,
loader: 'file-loader',
options: {
name: '[name].[ext]?[hash]'
}
}
]
},
resolve: {
alias: {
'vue$': 'vue/dist/vue.esm.js'
},
extensions: ['*', '.js', '.vue', '.json']
},
devServer: {
historyApiFallback: true,
noInfo: true,
overlay: true
},
performance: {
hints: false
},
devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
module.exports.devtool = '#source-map'
// http://vue-loader.vuejs.org/en/workflow/production.html
module.exports.plugins = (module.exports.plugins || []).concat([
new webpack.DefinePlugin({
'process.env': {
NODE_ENV: '"production"'
}
}),
new webpack.optimize.UglifyJsPlugin({
sourceMap: true,
compress: {
warnings: false
}
}),
new webpack.LoaderOptionsPlugin({
minimize: true
})
])
}

# Créez main.js

import Vue from 'vue' //librairie "vue" dans node_modules
import app from './app.vue' //fichier app.vue local
import MovieItemComponent from './components/movieitem.vue'

Vue.component('movie-item', MovieItemComponent);

new Vue({
el: '#app',
render: h => h(app)
})

# Créez app.vue

<template>
<div>
    <span id="msg">{{message}}</span>

    <p>Movie number : {{movies.length}}</p>
    <p>
        New movie<br />
        Title : <input type="text" v-model="movie_to_add.title" /><br />
        Year : <input type="text" v-model="movie_to_add.year" /><br />
        Synopsys : <textarea v-model="movie_to_add.synopsys"></textarea><br />
        <button v-on:click="newmovie2">Add</button>
    </p>
    Search : <input type="text" v-model="search" />

    <ul>
        <movie-item v-for="(movie, index) in movies_search" v-bind:key="movie.title" v-bind:movie="movie" v-on:edit="edit" v-on:remove="remove(index)"></movie-item>
    </ul>

    <p v-if="movie_to_edit">
        New movie<br />
        Title : <input type="text" v-model="movie_to_edit.title" /><br />
        Year : <input type="text" v-model="movie_to_edit.year" /><br />
        Synopsys : <textarea v-model="movie_to_edit.synopsys"></textarea><br />
        <button v-on:click="save">Save</button>
    </p>

</div>
</template>

<script>
export default {
    data() {
        return {
            message: "Hello",
            movie_to_add: {},
            movie_to_edit: null,
            search: "",
            movies : [
                {
                    title: "L'étrange noël de M. Jack",
                    year: 1994,
                    synopsys: "Jack Skellington, un épouvantail squelettique surnommé « le Roi des citrouilles » (Pumpkin King en version originale), vit dans la ville d'Halloween. En tant que maître de l'épouvante, Jack occupe ses journées à préparer la prochaine fête d'Halloween."
                },
                {
                    title: "Interstellar",
                    year: 2014,
                    synopsys: "Alors que la Terre se meurt, une équipe d'astronautes franchit un trou de ver apparu près de Saturne conduisant à une autre galaxie, cela dans le but d'explorer un nouveau système stellaire et l'espoir de trouver une nouvelle planète habitable par l'humanité afin de la sauver."
                }
            ]
        }
    },

    methods: {
        newmovie1: function() {
            this.movies.push({title:"New movie"})
        },
        newmovie2: function() {
            this.movies.push(this.movie_to_add)
            this.movie_to_add = {}
        },

        edit: function(movie) {
            this.movie_to_edit = movie
        },
        save: function() {
            this.movie_to_edit = null
        },
        remove: function(index) {
            this.movies.splice(index, 1)
        }
    },

    created: function() {
        console.log("Created")
    },

    computed: {
        firstletter: function() {
            return this.message[0]
        },
        movies_search: function() {
            return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
        }
    }
}
</script>

<style>
#msg {
  color: red;
}
</style>

# Créez index.html

<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>LP DAWIN</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="dist/build.js"></script>
  </body>
</html>

# Pour compiler le projet avec webpack, nous allons utiliser le binaire installé par NPM dans node_modules/.bin :

windows : node_modules\.bin\webpack --progress --hide-modules
linux : node_modules/.bin/webpack --progress --hide-modules

# Pour afficher le site, nous allons utiliser webpack-dev-server pendant le développement :

windows : node_modules\.bin\webpack-dev-server --open --hot
linux : node_modules/.bin/webpack-dev-server --open --hot


node_modules\.bin\webpack --progress --hide-modules && node src/node/app.js

https://cloud.mongodb.com
npm install mongodb --save