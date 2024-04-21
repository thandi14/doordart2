'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RestaurantImage.belongsTo(
        models.Restaurant,
          { foreignKey: 'restaurantId' }
      );
    }
  }
  RestaurantImage.init({
    restaurantId: DataTypes.INTEGER,
    bannerUrl: DataTypes.TEXT,
    thumbnailUrl: DataTypes.TEXT,
    iconUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'RestaurantImage',
  });
  return RestaurantImage;
};
