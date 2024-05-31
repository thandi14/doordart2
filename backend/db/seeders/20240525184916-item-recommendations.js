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
    const idsToRetrieve = [18, 19, 20, 21, 22, 23, 24];
    const idsToRetrieveSelec = [105, 106, 107, 108, 109, 110, 111];

    const options = await ItemOption.findAll({
      where: {
        id: idsToRetrieve
      }
    });

    const rec = options.flatMap(option => {
      return idsToRetrieveSelec.flatMap((selectionId) => [
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Pepsi®",
      },
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Diet Pepsi®",
      },
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Mountain Dew Legend™",
      },
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Mountain Dew®",
      },
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Starry®",
      },
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Tropicana® Lemonade",
      },
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Dr.Pepper®",
      },
      {
        optionId: option.id,
        selectionId: selectionId,
        recommendation: "Pepsi® Zero",
      }
    ]);
    });

    await ItemRecommendation.bulkCreate(rec);


  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ItemRecommendations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
