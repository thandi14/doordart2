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
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CartItems';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
