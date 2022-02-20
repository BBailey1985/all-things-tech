const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    username: 'bbailey1985',
    password: '12345'
  },
  {
    username: 'timmyjones',
    password: 'aaaaa'
  }
]

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;