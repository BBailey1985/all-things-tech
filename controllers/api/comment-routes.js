const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require("../../utils/auth");

//get all comments
router.get('/', (req, res) => {
  Comment.findAll()
  .then(commentData => res.json(commentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//create comment
router.post('/', withAuth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.session.user_id
  })
  .then(commentData => res.json(commentData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

//delete comment
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => {
    if (!commentData) {
      res.status(404).json({ message: 'User not found!'});
      return;
    }
    res.json(commentData)
  })
  .catch(err => {
    console.log(err);
    res.status(500),json(err);
  });
});

module.exports = router;