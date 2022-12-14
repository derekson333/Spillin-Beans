const sequelize = require('../config/connection');
const { User, Recipe, Ingredient, Instruction, IngredientMap, InstructionMap} = require('../models');

const userData = require('./userData.json');
const recipeData = require('./recipeData.json');
const ingredientData = require('./ingredientData.json');
const instructionData = require('./instructionData.json');
const ingredientMapData = require('./ingredientMapData.json');
const instructionMapData = require('./instructionMapData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipe of recipeData) {
    await Recipe.create({
      ...recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const ingredient of ingredientData) {
    await Ingredient.create({
      ...ingredient,
    });
  }

  for (const instruction of instructionData) {
    await Instruction.create({
      ...instruction,
    });
  }

  for (const ingredientMap of ingredientMapData) {
    await IngredientMap.create({
      ...ingredientMap,
    });
  }

  for (const instructionMap of instructionMapData) {
    await InstructionMap.create({
      ...instructionMap,
    });
  }

  process.exit(0);
};

seedDatabase();
