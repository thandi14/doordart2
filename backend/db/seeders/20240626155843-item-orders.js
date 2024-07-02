'use strict';

const { CartItem } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await CartItem.bulkCreate([
      {
        cartId: 1,
        itemId: 79,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 1,
        itemId: 53,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 4,
        itemId: 80,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 4,
        itemId: 81,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 1,
        itemId: 76,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 1,
        itemId: 55,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 4,
        itemId: 83,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 4,
        itemId: 84,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 1,
        itemId: 78,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 1,
        itemId: 57,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 4,
        itemId: 58,
        quantity: 1,
        instructions: ""
      },
      {
        cartId: 4,
        itemId: 85,
        quantity: 1,
        instructions: ""
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CartItems';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
