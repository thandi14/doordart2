'use strict';

const { Restaurant } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Restaurant.bulkCreate([
    {
      name: "McDonald's",
      deliveryFee: 2.99,
      type: "American",
      pickup: true,
    },
    {
      name: "Jack in the Box",
      deliveryFee: 3.99,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Buffalo Wild Wings",
      deliveryFee: 3.99,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Freddy's Frozen Custard Steakburgers",
      deliveryFee: 3.49,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Cicis Pizza",
      deliveryFee: 2.29,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Sonic Drive-In",
      deliveryFee: 3.99,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Wendy's",
      deliveryFee: 2.49,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Taco Bell",
      deliveryFee: 2.99,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Chicken Express",
      deliveryFee: 0,
      type: "Fast Food",
      pickup: true,
    },
    {
      name: "Cracker Barrel",
      deliveryFee: 0.49,
      type: "Restaurant",
      pickup: true,
    },
  ], {});
},

async down (queryInterface, Sequelize) {
  options.tableName = 'Restaurants';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, null, {})
}
};
