const router = require('express').Router();
const { User, Post } = require('../../models');

//get all users
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