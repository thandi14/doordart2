'use strict';

const { Search } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Search.bulkCreate([
      {
        userId: 1,
        query: "food",
      },
      {
        userId: 1,
        query: "restaurant",
      },
      {
        userId: 1,
        query: "breakfast",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Searches';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
