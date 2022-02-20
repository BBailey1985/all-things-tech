const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'This site is so cool!',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Wow I learned so much from this!',
    user_id: 2,
    post_id: 1
  }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;