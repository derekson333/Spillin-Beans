const router = require('express').Router();

const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const ingredientRoutes = require('./ingredientRoutes');
const instructionRoutes = require('./instructionRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/instructions', instructionRoutes);

module.exports = router;