'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemOption.belongsTo(
        models.MenuItem,
          { foreignKey: 'itemId' }
      );
      ItemOption.hasMany(
        models.ItemSelection,
          { foreignKey: 'optionId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  ItemOption.init({
    itemId: DataTypes.INTEGER,
    option: DataTypes.STRING,
    required: DataTypes.BOOLEAN,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemOption',
  });
  return ItemOption;
};
