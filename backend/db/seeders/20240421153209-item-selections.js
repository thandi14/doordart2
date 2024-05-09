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
      {
        optionId: 4,
        selection: "American",
      },
      {
        optionId: 4,
        selection: "Cheddar",
      },
      {
        optionId: 4,
        selection: "Swiss",
      },
      {
        optionId: 4,
        selection: "Pepper Jack",
      },
      {
        optionId: 4,
        selection: "No Cheese",
      },
      {
        optionId: 5,
        selection: "American",
      },
      {
        optionId: 5,
        selection: "Cheddar",
      },
      {
        optionId: 5,
        selection: "Swiss",
      },
      {
        optionId: 5,
        selection: "Pepper Jack",
      },
      {
        optionId: 5,
        selection: "No Cheese",
      },
      {
        optionId: 6,
        selection: "American",
      },
      {
        optionId: 6,
        selection: "Cheddar",
      },
      {
        optionId: 6,
        selection: "Swiss",
      },
      {
        optionId: 6,
        selection: "Pepper Jack",
      },
      {
        optionId: 6,
        selection: "No Cheese",
      },
      {
        optionId: 7,
        selection: "American",
      },
      {
        optionId: 7,
        selection: "Cheddar",
      },
      {
        optionId: 7,
        selection: "Swiss",
      },
      {
        optionId: 7,
        selection: "Pepper Jack",
      },
      {
        optionId: 7,
        selection: "No Cheese",
      },
      {
        optionId: 8,
        selection: "American",
      },
      {
        optionId: 8,
        selection: "Cheddar",
      },
      {
        optionId: 8,
        selection: "Swiss",
      },
      {
        optionId: 8,
        selection: "Pepper Jack",
      },
      {
        optionId: 8,
        selection: "No Cheese",
      },
      {
        optionId: 9,
        selection: "American",
      },
      {
        optionId: 9,
        selection: "Cheddar",
      },
      {
        optionId: 9,
        selection: "Swiss",
      },
      {
        optionId: 9,
        selection: "Pepper Jack",
      },
      {
        optionId: 9,
        selection: "No Cheese",
      },
      {
        optionId: 10,
        selection: "American",
      },
      {
        optionId: 10,
        selection: "Cheddar",
      },
      {
        optionId: 10,
        selection: "Swiss",
      },
      {
        optionId: 10,
        selection: "Pepper Jack",
      },
      {
        optionId: 10,
        selection: "No Cheese",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemSelections';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
