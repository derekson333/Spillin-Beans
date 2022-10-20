const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class IngredientMap extends Model {}

IngredientMap.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    
    recipe_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        unique: false,
        references: {
            model: 'recipe',
            key: 'id',
        },
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        unique: false,
        references: {
            model: 'ingredient',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ingredient_map',
});

module.exports = IngredientMap;