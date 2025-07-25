'use strict';
const { Offer } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await Offer.bulkCreate([
        {
          restaurantId: 1,
          offer: "$Free item on $15",
          discount: 15,
          deliveryFee: false,
          type: "$",

        },
        {
          restaurantId: 5,
          offer: "20% off, up to $5",
          discount: 20,
          deliveryFee: false,
          type: "%",
        },
        {
          restaurantId: 6,
          offer: "Spend $35, save $5",
          discount: 35,
          deliveryFee: false,
          type: "$",
        },
      ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Offers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
