'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingCart.belongsTo(
        models.Restaurant,
          { foreignKey: 'restaurantId' }
      );
      ShoppingCart.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      ShoppingCart.belongsTo(
        models.Offer,
          { foreignKey: 'offerId' }
      );
      ShoppingCart.belongsTo(
        models.Deal,
          { foreignKey: 'dealId' }
      );
      ShoppingCart.hasMany(
        models.CartItem,
          { foreignKey: 'cartId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  ShoppingCart.init({
    restaurantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    offerId: DataTypes.INTEGER,
    dealId: DataTypes.INTEGER,
    tip: DataTypes.DECIMAL,
    fees: DataTypes.STRING,
    gift: DataTypes.BOOLEAN,
    pickup: DataTypes.BOOLEAN,
    group: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    sessionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};
