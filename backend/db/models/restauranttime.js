'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       RestaurantTime.belongsTo(
        models.Restaurant,
          { foreignKey: 'restaurantId' }
      );
    }
  }
  RestaurantTime.init({
    restaurantId: DataTypes.INTEGER,
    monday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    tuesday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    wednesday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    thursday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    friday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    breakfast: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    lunch: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    dinner: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
  }, {
    sequelize,
    modelName: 'RestaurantTime',
  });
  return RestaurantTime;
};
