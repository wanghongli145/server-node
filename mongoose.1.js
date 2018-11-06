// p42 运行： node mongoose.1.js
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mongoose-test-db';
mongoose.connect(url);

let Book = mongoose.model('Book', {name: String});

let practicalNodeBook = new Book({name: 'Practical Node.js, 2nd edition'});
practicalNodeBook.save((err, results) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('Saved: ', results);
    process.exit(0);
  }
})
