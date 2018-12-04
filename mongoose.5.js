// p47 run： node mongoose.5.js
// relational queries
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/mongoose-test-db';
mongoose.connect(url, {useNewUrlParser: true});

const Post = mongoose.model('Post', {
  name: String,
  url: String,
  text: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});
const Comment = mongoose.model('Comment', {
  text: String
});
let ca = [
  { text: 'Cruel.... var { house, mouse} = No type optimization at all' },
  { text: 'I think you are undervaluing the benefit of ‘let’ and ‘const’.' },
  { text: '(p1,p2)=>{...}, i understand this, thank you!' }
].map((comment) => {
  const c = new Comment(comment);
  c.save();
  return c._id;
  });
console.log(ca);

var post = new Post({
  name: 'Top 10 ES6 Features every Web Developer must know',
  url: 'https://wevapplog.com/es6',
  text: 'This essay will give you a quik introduction to ES6. If you do not konw what is ES6',
  comments: ca
});
post.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('The post is saved:', post.toJSON())
  }
  
  Post.findOne({ name: /Top 10 ES6/i })
    .populate('comments')
    .exec(function (err, post) {
      if (err) return console.error(err);
      console.log('The post is %s', post);
      mongoose.disconnect();
  })
})

