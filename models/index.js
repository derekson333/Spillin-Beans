const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./ingredient');
const Instruction = require('./instruction');
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
  through: InstructionMap,
  foreignKey: 'recipe_id'
});






module.exports = { User, Recipe, Ingredient, Instruction, IngredientMap, InstructionMap};
