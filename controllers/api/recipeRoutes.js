const router = require('express').Router();
const {
    Recipe,
    Ingredient,
    Instruction,
    IngredientMap,
    InstructionMap
} = require('../../models');

// GET route to view all recipes
router.get('/', async (req, res) => {
    try {
        const recipeData = await Recipe.findAll({
            include: [{
                    model: Ingredient,
                    as: 'ingredients'
                },
                {
                    model: Instruction,
                    as: 'instructions'
                },
            ]
        });

        if (!recipeData) {
            res.status(404).json('No recipes to display');
        };

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', (req, res) => {
    Recipe.create(req.body)
      .then((recipe) => {
        
          const recipeIngredients = req.body.ingredients.map((ingredient_id) => {
            return {
              recipe_id: recipe.id,
              ingredient_id,
            };
          });
          IngredientMap.bulkCreate(recipeIngredients);
    
            const recipeInstructions = req.body.instructions.map((instruction_id) => {
              return {
                recipe_id: recipe.id,
                instruction_id,
              };
            });
           InstructionMap.bulkCreate(recipeInstructions);
    
        res.status(200).json(recipe);
      })
      .then((ingredients) => res.status(200).json(ingredients))
   
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

// GET route to view a single recipe
router.get('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id, {
            include: [
                { model: Ingredient, through: IngredientMap },
                { model: Instruction, through: InstructionMap }
           ]
        });

        if (!recipeData) {
            res.status(404).json('No recipe found with that id');
            return;
        };
        
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// PUT route to update a single recipe by id
router.put('/:id', async (req, res) => {
    Recipe.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
        .then((recipe) => {
          // find all associated tags from IngredientMap
          return IngredientMap.findAll({ where: { recipe_id: req.params.id } });
        })
        .then((currentIngredients) => {
          // get list of current ingredient_ids
          const recipeIngredients = currentIngredients.map(({ ingredient_id }) => ingredient_id);
          // create filtered list of new ingredient_ids
          const newIngredients = req.body.ingredients
            .filter((ingredient_id) => !recipeIngredients.includes(ingredient_id))
            .map((ingredient_id) => {
              return {
                recipe_id: req.params.id,
                ingredient_id,
              };
            });
          // figure out which ones to remove
          const ingredientsToRemove = currentIngredients
            .filter(({ ingredient_id }) => !req.body.ingredients.includes(ingredient_id))
            .map(({ id }) => id);
    
          // run both actions
          return Promise.all([
            IngredientMap.destroy({ where: { id: ingredientsToRemove } }),
            IngredientMap.bulkCreate(newIngredients),
          ]);
        })
        .then((updatedInstructions) => res.status(200).json(updatedInstructions))
        .catch((err) => {
          // console.log(err);
          res.status(400).json(err);
        });
    });
    
// DELETE route to delete a single user by id
router.delete('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!recipeData) {
            res.status(404).json('No recipe found with that id');
            return;
        };

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;