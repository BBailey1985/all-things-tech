const router = require('express').Router()
const { Post, User } = require('../../models');
const sequelize = require('../../config/connection');

//get all posts
router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
    ],
  })
  .then((postData) => res.json(postData))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get 1 post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
    ],
  })
  .then((postData) => {
    if (!postData) {
      res.status(400).json({ message: 'Post not found!' });
      return
    }
    res.json(postData);
  })
  .catch ((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//create a post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    user_id: req.body.user_id,
  })
  .then((postData) => res.json(postData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  });
});

//update a post
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: 'Post not found!' });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//delete a post
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;