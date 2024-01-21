const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require(`./routing/user_route`);
const addroute = require(`./routing/add_routing`);
const authroute = require(`./routing/auth_routing`);
const cookie = require('cookie-parser');

const app = express();
const port = process.env.PORT;

//setting MongoDB Connection........................
mongoose.connect('mongodb://0.0.0.0:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB....');
  })
  .catch((err) => {
    console.error('Failed to Connect...', err);
  });

app.use(bodyParser.json());
app.use(cookie());

//using router functionality.....
app.use('/', routes);
app.use('/', addroute);
app.use('/', authroute);

//Server...
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

