'use strict';

const { ItemOption } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ItemOption.bulkCreate([
      {
        itemId: 1,
        option: "Select Sauce 1/2",
        required: true,
        number: 1,
      },
      {
        itemId: 1,
        option: "Select Sauce 2/2",
        required: true,
        number: 1,
      },
      {
        itemId: 42,
        option: "Flavor",
        required: true,
        number: 1,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemOptions';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
