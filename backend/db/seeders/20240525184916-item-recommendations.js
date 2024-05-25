'use strict';

const { ItemRecommendation } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ItemRecommendation.bulkCreate([
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Pepsi®",
    },
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Diet Pepsi®",
    },
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Mountain Dew Legend™",
    },
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Mountain Dew®",
    },
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Starry®",
    },
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Tropicana® Lemonade",
    },
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Dr.Pepper®",
    },
    {
      optionId: 19,
      selectionId: 105,
      recommendation: "Pepsi® Zero",
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemRecommendations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
