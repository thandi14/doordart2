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
        price: 36.47,
        status: "Ordered",
      },
      {
        restaurantId: 1,
        userId: 2,
        price: 13.88,
        status: "Ordered",
      },
      {
        restaurantId: 6,
        userId: 1,
        price: 21.18,
        status: "Ordered",
      },
      {
        restaurantId: 3,
        userId: 1,
        price: 99.44,
        status: "Ordered",
      },
      {
        restaurantId: 3,
        userId: 2,
        price: 34.84,
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
