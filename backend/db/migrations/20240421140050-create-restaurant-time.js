'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RestaurantTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      monday: {
        type: Sequelize.STRING
      },
      tuesday: {
        type: Sequelize.STRING
      },
      wednesday: {
        type: Sequelize.STRING
      },
      thursday: {
        type: Sequelize.STRING
      },
      friday: {
        type: Sequelize.STRING
      },
      breakfast: {
        type: Sequelize.STRING
      },
      lunch: {
        type: Sequelize.STRING
      },
      dinner: {
        type: Sequelize.STRING
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
    options.tableName = "RestaurantTimes";
    return queryInterface.dropTable(options);
  }
};
