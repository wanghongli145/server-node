// p48 run： node mongoose.6.js
// relational queries
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/mongoose-test-db';
mongoose.connect(url, {useNewUrlParser: true});

const Post = mongoose.model('Post', {
  name: String,
  url: String,
  text: String,
});
const Comment = mongoose.model('Comment', {
  text: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});
Comment.remove();
Post.remove();
var post = new Post({
  name: 'Top 10 ES6 Features every Web Developer must know',
  url: 'https://wevapplog.com/es6',
  text: 'This essay will give you a quik introduction to ES6. If you do not konw what is ES6'
});
post.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('The post is saved:', post.toJSON())
  }
  let i = 0;
  let ca = [
    { text: 'Cruel.... var { house, mouse} = No type optimization at all' },
    { text: 'I think you are undervaluing the benefit of ‘let’ and ‘const’.' },
    { text: '(p1,p2)=>{...}, i understand this, thank you!' }
  ].forEach((comment, index, list) => {
    comment.post = post._id;
    const c = new Comment(comment);
    c.save((error, result) => {
      if (error) return console.error(error);
      i++;
      if (i == list.length) {
        queryCommentWithPost();
      }
    });
  });
});

const queryCommentWithPost = () => {
  Comment
    .findOne({ text: /Cruel/i })
    .populate('post')
    .exec(function (err, comment) {
      if (err) return console.error(err);
      console.log('The post is %s', comment);
      mongoose.disconnect();
    })
}
