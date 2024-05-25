'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemRecommendation.belongsTo(
        models.ItemOption,
          { foreignKey: 'optionId' }
      );
      ItemRecommendation.belongsTo(
        models.ItemSelection,
          { foreignKey: 'selectionId' }
      );
      ItemRecommendation.hasMany(
        models.CartItemNotes,
          { foreignKey: 'selectionId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  ItemRecommendation.init({
    optionId: DataTypes.INTEGER,
    selectionId: DataTypes.INTEGER,
    recommendation: DataTypes.STRING,
    cals: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    selected: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ItemRecommendation',
  });
  return ItemRecommendation;
};
