const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Instruction = require('./Instruction');
const IngredientMap = require('./IngredientMap');
const InstructionMap = require('./InstructionMap')

User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

Ingredient.belongsToMany(Recipe, {
  through: IngredientMap
})

Recipe.belongsToMany(Ingredient, {
  through: IngredientMap,
  foreignKey: 'recipe_id'
})
Instruction.belongsToMany(Recipe, {
  through: InstructionMap,
  foreignKey: 'instruction_id'
})
Recipe.belongsToMany(Instruction, {
  through: InstructionMap
});






module.exports = { User, Recipe, Ingredient, Instruction, IngredientMap, InstructionMap};
