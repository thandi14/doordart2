'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.hasOne(
        models.RestaurantImage,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
      Restaurant.hasOne(
        models.RestaurantTime,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
      Restaurant.hasMany(
        models.Review,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
      Restaurant.hasMany(
        models.Offer,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
      Restaurant.hasMany(
        models.Save,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
      Restaurant.hasMany(
        models.ShoppingCart,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
      Restaurant.hasMany(
        models.MenuItem,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
      Restaurant.hasMany(
        models.Search,
          { foreignKey: 'restaurantId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  Restaurant.init({
    userId: DataTypes.INTEGER,
    franchiseId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    deliveryFee: DataTypes.DECIMAL,
    deliveryTime: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    pickup: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
