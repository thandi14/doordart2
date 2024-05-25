'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemRecommendations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      optionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ItemOptions',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      selectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ItemSelections',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      recommendation: {
        type: Sequelize.STRING
      },
      cals: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      selected: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "ItemRecommendations";
    return queryInterface.dropTable(options);
  }
};
