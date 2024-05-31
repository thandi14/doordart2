'use strict';

const { ItemOption, MenuItem } = require('../models');
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
      {
        itemId: 79,
        option: "Cheese",
        required: true,
        number: 1,
      },
      {
        itemId: 80,
        option: "Cheese",
        required: true,
        number: 1,
      },
      {
        itemId: 81,
        option: "Cheese",
        required: true,
        number: 1,
      },
      {
        itemId: 82,
        option: "Cheese",
        required: true,
        number: 1,
      },
      {
        itemId: 83,
        option: "Cheese",
        required: true,
        number: 1,
      },
      {
        itemId: 84,
        option: "Cheese",
        required: true,
        number: 1,
      },
      {
        itemId: 85,
        option: "Cheese",
        required: true,
        number: 1,
      },
      {
        itemId: 79,
        option: "Options",
        number: 7,
      },
      {
        itemId: 80,
        option: "Options",
        number: 7,

      },
      {
        itemId: 81,
        option: "Options",
        number: 7,

      },
      {
        itemId: 82,
        option: "Options",
        number: 7,

      },
      {
        itemId: 83,
        option: "Options",
        number: 7,

      },
      {
        itemId: 84,
        option: "Options",
        number: 7,

      },
      {
        itemId: 85,
        option: "Options",
        number: 7,

      },
    ], {});

    const idsToRetrieve = [79, 80, 81, 82, 83, 84, 85];

    const items = await MenuItem.findAll({
      where: {
      id: idsToRetrieve 
      }
    });

    const menuItems = items.flatMap(item => [
      {
        itemId: item.id,
        option: "Recommended Beverages",
        number: 5,
      },
    ]);

    const moreItems = items.flatMap(item => [
      {
        itemId: item.id,
        option: "Pick One",
        required: true,
        number: 1,
      },
    ]);

    await ItemOption.bulkCreate(menuItems);
    await ItemOption.bulkCreate(moreItems);

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemOptions';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
