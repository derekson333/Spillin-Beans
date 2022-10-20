const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const Instruction = require('./instruction');
const IngredientMap = require('./ingredientMap');
const InstructionMap = require('./instructionMap')

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
  through: InstructionMap,
  foreignKey: 'recipe_id'
});






module.exports = { User, Recipe, Ingredient, Instruction, IngredientMap, InstructionMap};
