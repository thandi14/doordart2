'use strict';

const { RestaurantTime } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await RestaurantTime.bulkCreate([
      {
        restaurantId: 1,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 2,
        monday: "6 AM - 1:40 AM",
        tuesday: "6 AM - 1:40 AM",
        wednesday: "6 AM - 1:40 AM",
        thursday: "12 AM - 12 AM",
        friday: "6 AM - 7 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 3,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 4,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 5,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 6,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 7,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 8,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 9,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
      {
        restaurantId: 10,
        monday: "5 AM - 12:30 AM",
        tuesday: "5 AM - 12:30 AM",
        wednesday: "5 AM - 12:30 AM",
        thursday: "5 AM - 12:30 AM",
        friday: "6 AM - 12:30 AM",
        saturday: "6 AM - 12:30 AM",
        breakfast: "5 AM - 12:30 AM",
        lunch: "6 AM - 12:30 AM",
        dinner: "6 AM - 12:30 AM",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'RestaurantTimes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
