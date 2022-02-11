const router = require('express').Router();
const { User, Post } = require('../../models');

//GET all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: {exclude: ['password']}
  })
  .then(userData => res.json(userData))
  .catch(err => {
    console.log(err);
    res.status(500),json(err);
  });
});

//GET 1 user
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: {exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'created_at']
      }
    ]
  })
  .then(userData => {
    if (!userData) {
      res.status(404).json({ message: 'User not found!'});
      return;
    }
    res.json(userData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json
  })
})

//POST new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(userData => {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json(userData)
    });
  });
});

//update user
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(userData => {
    if (!userData[0]) {
      res.status(404).json({ message: 'User not found '});
      return;
    }
    res.json(userData);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//delete a user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(userData => {
    if (!userData) {
      res.status(404).json({ message: 'User not found '});
      return;
    }
    res.json(userData);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;