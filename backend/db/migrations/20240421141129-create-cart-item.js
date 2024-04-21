'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ShoppingCarts',
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
      quantity: {
        type: Sequelize.INTEGER
      },
      instructions: {
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
    options.tableName = "CartItems";
    return queryInterface.dropTable(options);
  }
};
