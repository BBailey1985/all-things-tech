const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

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
        attributes: ['id', 'title', 'description', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      }
    ]
  })
  .then(userData => {
    if (!userData) {
      res.status(404).json({ message: 'User not found!' });
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
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  });
});

//user login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
  .then((userData) => {
    if (!userData) {
      res.status(400).json({ message: 'User not found!' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Password Incorrect!, Please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'Access Granted!' });
    });
  });
});

//user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

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