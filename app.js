// P49
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/my-first-db';

mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(errorhandler());
app.use(express.static(path.join(__dirname, '/')));

const Account = mongoose.model('Account', {
  name: String,
  balance: Number
});

app.get('/accounts', (req, res, next) => {
  Account.find({}, null, { sort: { _id: -1 } }, (error, accounts) => {
    if (error) return next(error);
    res.send(accounts);
  });
});
app.param('id', (req, res, next) => {
  Account.findById(req.params.id, (error, account) => {
    req.account = account;
    next();
  });
});

app.get('/accounts/:id', (req, res, next) => {
    res.send(req.account.toJSON());
});

app.post('/accounts', (req, res, next) => {
  let newAccount = new Account(req.body);
  newAccount.save((error, results) => {
    if (error) return next(error);
    console.log('文档插入成功');
    res.send(results);
  });
});

app.put('/accounts/:id', (req, res, next) => {
    if (req.body.name) account.name = req.body.name;
    if (req.body.balance) account.balance = req.body.balance;
    req.account.save((error, results) => {
      res.send(results);
    }); 
});

app.delete('/accounts/:id', (req, res, next) => {
  console.log(req.params.id);
  req.account.remove((error, results) => {
    if (error) return next(error);
    res.send(results);
  });
});
const port = 7000;
app.use(errorhandler());
app.listen(port);
console.log(`Your server is running in localhost:${port}`);
