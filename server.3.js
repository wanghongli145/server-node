// P39
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

  app.get('/accounts', (req, res, next) => {
    dataBase.collection('accounts')
      .find({}, {sort: {_id: -1}})
      .toArray((error, accounts) => {
        if (error) return next(error);
        res.send(accounts);
      });
  });

  app.get('/accounts/:id', (req, res, next) => {
    dataBase.collection('accounts')
      .find({_id: mongodb.ObjectID(req.params.id)}, {
        sort: {
          _id: -1
        }
      })
      .toArray((error, accounts) => {
        if (error) return next(error);
        res.send(accounts);
      });
  })

  app.post('/accounts', (req, res, next) => {
    let newAccount = req.body;
    console.log(newAccount);
    dataBase.collection('accounts').insert(newAccount, (error, results) => {
      if (error) return next(error);
      console.log("文档插入成功");
      res.send(results);
    });
  });

  app.put('/accounts/:id', (req, res, next) => {
    dataBase.collection('accounts')
      .update({_id: mongodb.ObjectID(req.params.id)}, {$set: req.body}, (error, results) => {
      if (error) return next(error);
      res.send(results);
    });
  });

  app.delete('/accounts/:id', (req, res, next) => {
    console.log(req.params.id);
    dataBase.collection('accounts')
      .remove({
        _id: mongodb.ObjectID(req.params.id)
      }, (error, results) => {
        if (error) return next(error);
        res.send(results);
      });
  });
  const port = 7001;
  app.use(errorhandler())
  app.listen(port);
  console.log(`Your server is running in localhost:${port}`)
})