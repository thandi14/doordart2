'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 2,
        restaurantId: 1,
        review: "Was tasty and all requested extra items provided!",
        rating: 5,
      },
      {
        userId: 3,
        restaurantId: 1,
        review: "Quality is a hit or miss, it'll either be super good and have the correct request for your food or be undercooked and something forgotten and cold.",
        rating: 3,
      },
      {
        userId: 1,
        restaurantId: 8,
        review: "Food was terrible, wouldn't recommend it to anyone.",
        rating: 1,
      },
      {
        userId: 2,
        restaurantId: 10,
        review: "Excellent service and delicious food! Definitely coming back again.",
        rating: 5,
      },
      {
        userId: 3,
        restaurantId: 1,
        review: "Average experience. The food was okay, but nothing special.",
        rating: 3,
      },
      {
        userId: 1,
        restaurantId: 1,
        review: "The restaurant was very dirty and the staff was rude.",
        rating: 2,
      },
      {
        userId: 3,
        restaurantId: 10,
        review: "One of the best dining experiences I've had in a long time. Everything was perfect!",
        rating: 5,
      },
      {
        userId: 2,
        restaurantId: 3,
        review: "Horrible food, terrible service. Avoid this place at all costs!",
        rating: 1,
      },
      {
        userId: 1,
        restaurantId: 4,
        review: "Decent food, but overpriced for the quality. Wouldn't go back.",
        rating: 2,
      },
      {
        userId: 3,
        restaurantId: 1,
        review: "The ambiance was nice, but the food was disappointing.",
        rating: 3,
      },
      {
        userId: 2,
        restaurantId: 1,
        review: "Great food, friendly staff. Will definitely recommend to friends!",
        rating: 4,
      },
      {
        userId: 1,
        restaurantId: 7,
        review: "The food was amazing and the service was outstanding. Highly recommend!",
        rating: 5,
      },
      {
        userId: 1,
        restaurantId: 8,
        review: "Food was terrible, wouldn't recommend it to anyone.",
        rating: 1,
      },
      {
        userId: 2,
        restaurantId: 2,
        review: "Excellent service and delicious food! Definitely coming back again.",
        rating: 5,
      },
      {
        userId: 3,
        restaurantId: 3,
        review: "Average experience. The food was okay, but nothing special.",
        rating: 3,
      },
      {
        userId: 1,
        restaurantId: 4,
        review: "The restaurant was very dirty and the staff was rude.",
        rating: 2,
      },
      {
        userId: 3,
        restaurantId: 5,
        review: "One of the best dining experiences I've had in a long time. Everything was perfect!",
        rating: 5,
      },
      {
        userId: 2,
        restaurantId: 6,
        review: "Horrible food, terrible service. Avoid this place at all costs!",
        rating: 1,
      },
      {
        userId: 1,
        restaurantId: 7,
        review: "Decent food, but overpriced for the quality. Wouldn't go back.",
        rating: 2,
      },
      {
        userId: 3,
        restaurantId: 1,
        review: "The ambiance was nice, but the food was disappointing.",
        rating: 3,
      },
      {
        userId: 2,
        restaurantId: 2,
        review: "Great food, friendly staff. Will definitely recommend to friends!",
        rating: 4,
      },
      {
        userId: 1,
        restaurantId: 3,
        review: "The food was amazing and the service was outstanding. Highly recommend!",
        rating: 5,
      },
      {
        userId: 3,
        restaurantId: 4,
        review: "The food was cold and the service was slow. Not worth the price.",
        rating: 2,
      },
      {
        userId: 1,
        restaurantId: 5,
        review: "Decent food, but the portions were small. Expected better for the price.",
        rating: 3,
      },
      {
        userId: 2,
        restaurantId: 6,
        review: "Great ambiance and tasty food. Would come back again!",
        rating: 4,
      },
      {
        userId: 3,
        restaurantId: 7,
        review: "Mediocre food, but friendly staff. Nothing special.",
        rating: 3,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
