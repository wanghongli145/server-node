//  p43 运行： node mongoose.2.js
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mongoose-test-db';
mongoose.connect(url);

let Book = mongoose.model('Book', {
  name: String,
  publicshed: Boolean,
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now}
});

let practicalNodeBook = new Book({
  name: 'Practical Node.js, 2nd edition',
  author: 'Azat',
  link: 'https://github.com/azat-co/practicalnode',
  created: Date.now()
});
console.log('Is new?', practicalNodeBook.isNew);
practicalNodeBook.save((err, results) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('Saved: ', results);
    console.log('Is new?', practicalNodeBook.isNew);
    Book.findOne({ _id: practicalNodeBook.id }, 'name', (error, bookDoc) => {
      console.log(bookDoc.toJSON());
      console.log(bookDoc.id);
      bookDoc.published = true;
      bookDoc.save(console.log)
      // bookDoc.remove(process.exit)
    })
  }
})
