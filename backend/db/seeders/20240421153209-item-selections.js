'use strict';

const { ItemSelection } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ItemSelection.bulkCreate([
      {
        optionId: 1,
        selection: "Tangy BBQ Dipping Sauce",
        cals: "45 cal",
      },
      {
        optionId: 1,
        selection: "Sweet N Sour Dipping Sauce",
        cals: "50 cal",
      },
      {
        optionId: 1,
        selection: "Honey Packet",
        cals: "50 cal",
      },
      {
        optionId: 1,
        selection: "Hot Musturd Dipping Sauce",
        cals: "45 cal",
      },
      {
        optionId: 1,
        selection: "Creamy Ranch Sauce",
        cals: "105 cal",
      },
      {
        optionId: 1,
        selection: "Hot Pincate Salsa",
        cals: "5 cal",
      },
      {
        optionId: 1,
        selection: "Mild Pincate Salsa",
        cals: "5 cal",
      },
      {
        optionId: 1,
        selection: "Ketchup Packet",
        cals: "10 cal",
      },
      {
        optionId: 1,
        selection: "Honey Musturd",
        cals: "60 cal",
      },
      {
        optionId: 1,
        selection: "Spicy Buffalo Sauce",
        cals: "30 cal",
      },
      {
        optionId: 1,
        selection: "No Sauce",
      },

      {
        optionId: 2,
        selection: "Tangy BBQ Dipping Sauce",
        cals: "45 cal",
      },
      {
        optionId: 2,
        selection: "Sweet N Sour Dipping Sauce",
        cals: "50 cal",
      },
      {
        optionId: 2,
        selection: "Honey Packet",
        cals: "50 cal",
      },
      {
        optionId: 2,
        selection: "Hot Musturd Dipping Sauce",
        cals: "45 cal",
      },
      {
        optionId: 2,
        selection: "Creamy Ranch Sauce",
        cals: "105 cal",
      },
      {
        optionId: 2,
        selection: "Hot Pincate Salsa",
        cals: "5 cal",
      },
      {
        optionId: 2,
        selection: "Mild Pincate Salsa",
        cals: "5 cal",
      },
      {
        optionId: 2,
        selection: "Ketchup Packet",
        cals: "10 cal",
      },
      {
        optionId: 2,
        selection: "Honey Musturd",
        cals: "60 cal",
      },
      {
        optionId: 2,
        selection: "Spicy Buffalo Sauce",
        cals: "30 cal",
      },
      {
        optionId: 2,
        selection: "No Sauce",
      },
      {
        optionId: 2,
        selection: "Mild Pincate Salsa",
        cals: "5 cal",
      },
      {
        optionId: 3,
        selection: "Cherry Limeade Slush",
        price: 2.67,
      },
      {
        optionId: 3,
        selection: "Lemonade Slush",
        price: 2.67,
      },
      {
        optionId: 3,
        selection: "Limeade Slush",
        price: 2.67,
      },
      {
        optionId: 3,
        selection: "Strawberry Real Fruit Slush",
        price: 1.57,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemSelections';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
