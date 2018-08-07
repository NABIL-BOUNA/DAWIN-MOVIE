const express = require('express');
const routes = require('./routes.js');

const app = express();
app.use('/', routes);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
