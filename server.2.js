const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/my-first-db';
const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());
app.use(express.static(path.join(__dirname, '/')));

MongoClient.connect(url, function(err, db) {
  console.log(db);
  const studentObj = {
    name: 'Gina',
    age: '25'
  };
  const dataBase = db.db('my-first-db');
  dataBase.collection('students').insertOne(studentObj, function (err, res) {
    if (err) throw err;
    console.log("文档插入成功");
    db.close();
  });
})


app.post('/transactions', (req, res) => {
  console.log(req.body);
  console.log(req.query.api_key);
  res.send({'msg': 'transactions'});
})
app.use('/', (req, res, next) => {
  // console.log(req);
  next();
});

app.get('/accounts', (req, res) => {
  res.status(200).send('get accounts');
})

const port = 7001;
app.listen(port);
console.log(`Your server is running in localhost:${port}`)