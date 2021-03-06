'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({   
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,   
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Sorry, Please provide a title.' }
      }   
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Sorry, Please provide a description.' }
      }
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  }, { sequelize });

  Course.associate = (models) => {
    // define associations
    Course.belongsTo(models.User, {
      as: 'owner', //alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    }); 
  };
  return Course;
};