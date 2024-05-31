'use strict';

const { ItemRecommendation, ItemOption } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  let obj = {
    "18": 105,
    "19": 106,
    "20": 107,
    "21": 108,
    "22": 109,
    "23": 110,
    "24": 111
  };

  const rec = [];

  for (let optionId in obj) {
    const selectionId1 = obj[optionId];

    const recommendations = [
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Pepsi®",
      },
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Diet Pepsi®",
      },
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Mountain Dew Legend™",
      },
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Mountain Dew®",
      },
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Starry®",
      },
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Tropicana® Lemonade",
      },
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Dr.Pepper®",
      },
      {
        optionId: optionId,
        selectionId: selectionId1,
        recommendation: "Pepsi® Zero",
      },
    ];

    rec.push(...recommendations);
  }


  await ItemRecommendation.bulkCreate(rec);

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemRecommendations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
