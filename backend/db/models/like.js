'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(
        models.MenuItem,
          { foreignKey: 'itemId' }
      );
      Like.belongsTo(
        models.Review,
          { foreignKey: 'reviewId' }
      );
      Like.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
    }
  }
  Like.init({
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    thumbUp: DataTypes.BOOLEAN,
    thumbsDown: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
