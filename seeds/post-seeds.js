const { Post } = require('../models');

const postData = [
  {
    title: 'How to code',
    description: 'Enroll at UTA bootcamp!',
    user_id: 1,
  },
  {
    title: 'What is Javascript?',
    description: 'It is a coding language',
    user_id: 2,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;