'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Save,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );
      User.hasMany(
        models.Review,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );
      User.hasMany(
        models.Like,
          { foreignKey: 'userId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  User.init({
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    door: DataTypes.BOOLEAN
  },{
    sequelize,
    modelName: "User",
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
