const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class InstructionMap extends Model {}

InstructionMap.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    
    recipe_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
            model: 'recipe',
            key: 'id',
        },
    },
    instruction_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
            model: 'instruction',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'instruction_map',
});

module.exports = InstructionMap;