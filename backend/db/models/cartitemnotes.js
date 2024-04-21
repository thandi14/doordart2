'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItemNotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItemNotes.belongsTo(
        models.ItemSelection,
          { foreignKey: 'selectionId' }
      );
      CartItemNotes.belongsTo(
        models.CartItem,
          { foreignKey: 'itemId' }
      );
    }
  }
  CartItemNotes.init({
    itemId: DataTypes.INTEGER,
    selectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItemNotes',
  });
  return CartItemNotes;
};
