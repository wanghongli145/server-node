// p45 run： node mongoose.4.js
// virtual options
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/mongoose-test-db';
mongoose.connect(url, {useNewUrlParser: true});

const bookSchema = mongoose.Schema({
  name: String,
  published: Boolean,
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now },
  email: String,
  reviews: [mongoose.Schema.Types.Mixed]
});

bookSchema.virtual('authorPhotoUrl').get(function () {
  if (!this.email) return null;
  var crypto = require('crypto'),
    email = this.email;
  email = email.trim();
  email = email.toLowerCase();
  var hash = crypto.createHash('md5').update(email).digest('hex');
  var gravatarBaseUrl = 'https://secure.gravatar.com/avatar/';
  return gravatarBaseUrl + hash;
})
let Book = mongoose.model('Book', bookSchema);
let practicalNodeBook = new Book({
  name: 'Practical Node.js, 2nd Edition',
  author: 'Azat',
  email: 'hi@abc.com',
  link: 'www.baidu.com',
  createdSt: Date.now()
});

practicalNodeBook.save((error, results) => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log('Saved: ', results);
    console.log('book author photo: ', practicalNodeBook.authorPhotoUrl);
    practicalNodeBook.remove(process.exit)
  }
})
