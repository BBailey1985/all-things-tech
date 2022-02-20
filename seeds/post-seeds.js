const { Post } = require('../models');

const postData = [
  {
    title: 'How to code',
    post_url: 'https://www.codecademy.com/learn/learn-how-to-code',
    user_id: 1,
  },
  {
    title: 'What is Javascript?',
    post_url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript',
    user_id: 2,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;