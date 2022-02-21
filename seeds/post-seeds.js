const { Post } = require('../models');

const postData = [
  {
    title: 'How to code',
    description: 'This is how you code!',
    user_id: 1,
  },
  {
    title: 'What is Javascript?',
    description: 'You think you know Javascript?',
    user_id: 2,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;