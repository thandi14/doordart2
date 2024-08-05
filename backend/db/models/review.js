'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(
        models.Restaurant,
          { foreignKey: 'restaurantId' }
      );
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Review.belongsTo(
        models.ShoppingCart,
          { foreignKey: 'orderId' }
      );
      Review.hasMany(
        models.Like,
        { foreignKey: 'reviewId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    franchiseId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
