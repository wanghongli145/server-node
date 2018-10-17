const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const mongodb = require('mongodb');

const url = 'mongodb://localhost:27017/my-first-db';
const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(errorhandler());
app.use(express.static(path.join(__dirname, '/')));

mongodb.MongoClient.connect(url, function (err, db) {
  console.log(db);
  const dataBase = db.db('my-first-db');

  app.use('/', (req, res, next) => {
    // console.log(req);
    next();
  });

  const port = 7001;
  app.use(errorhandler())
  app.listen(port);
  console.log(`Your server is running in localhost:${port}`)
})