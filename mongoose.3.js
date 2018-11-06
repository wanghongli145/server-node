// p44 运行： node mongoose.3.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/mongoose-test-db';
mongoose.connect(url, {useNewUrlParser: true});

const bookSchema = mongoose.Schema({ name: String });

bookSchema.method({
  buy (quantity, customer, callback) {
    var bookToPurchase = this;
    console.log('buy');
    return callback();
  },
  refund (customer, callback) {
    console.log('refund');
    return callback();
  }
});

bookSchema.static({
  getZeroInventoryReport (callback) {
    console.log('getZeroInventoryReport');
    let books = [];
    return callback(books);
  },
  getCountOfBooksById (bookId, callback) {
    console.log('getCountOfBooksById');
    let count = 0;
    return callback(count);
  }
});

let Book = mongoose.model('Book', bookSchema);
Book.getZeroInventoryReport(() => {});
Book.getCountOfBooksById(123, () => { });

let practicalNodeBook = new Book({ name: 'Practical Node.js, 111' });

practicalNodeBook.buy(1, 2, () => { });
practicalNodeBook.refund(1, () => { });

bookSchema.post('save', function (next) {
  console.log('post save');
  return next();
});

bookSchema.pre('remove', function (next) {
  console.log('pre remove');
  return next();
});

practicalNodeBook.save((error, results) => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log('Saved: ', results);
    practicalNodeBook.remove((error, results) => {
      if (error) {
        console.error(error);
        process.exit(1);
      } else {
        process.exit(0);
      }
    })
  }
})
