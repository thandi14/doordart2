'use strict';

const { ShoppingCart } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ShoppingCart.bulkCreate([
      {
        restaurantId: 3,
        userId: 1,
        price: 14,
        status: "Ordered",
      },
      {
        restaurantId: 1,
        userId: 2,
        price: 8,
        status: "Ordered",
      },
      {
        restaurantId: 6,
        userId: 1,
        price: 8,
        status: "Ordered",
      },
      {
        restaurantId: 3,
        userId: 2,
        price: 14,
        status: "Ordered",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ShoppingCarts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
