const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/')));


app.post('/transactions', (req, res) => {
  console.log(req.body);
  console.log(req.query.api_key);
  res.send({'msg': 'transactions'});
})
app.use('/', (req, res, next) => {
  // console.log(req);
});

const port = 7001;
app.listen(port);
console.log(`Your server is running in localhost:${port}`)