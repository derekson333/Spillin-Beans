const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient')
const Instruction = require('./Instruction')

User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Recipe.hasMany(Ingredient, {
});

Ingredient.belongsToMany(Recipe, {

})

Recipe.hasMany(Instruction, {
});

Instruction.belongsToMany(Recipe, {
  
})


Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Recipe, Ingredient, Instruction };
