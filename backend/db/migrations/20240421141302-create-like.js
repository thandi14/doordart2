'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MenuItems',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      reviewId: {
        type: Sequelize.INTEGER
      },
      thumbUp: {
        type: Sequelize.BOOLEAN
      },
      thumbsDown: {
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
    options.tableName = "Likes";
    return queryInterface.dropTable(options);
  }
};

