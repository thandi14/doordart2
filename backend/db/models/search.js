'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Search.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Search.belongsTo(
        models.Restaurant,
          { foreignKey: 'restaurantId' }
      );
    }
  }
  Search.init({
    restaurantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    query: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Search',
  });
  return Search;
};
