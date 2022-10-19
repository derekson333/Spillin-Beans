const router = require('express').Router();
const { Recipe, Ingredient, Instruction } = require('../../models');

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
            }]
            });
        
        if (!recipeData) {
            res.status(404).json('No recipes to display');
        };

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    };
});


// POST route to add a single recipe
router.post('/', async (req, res) => {
    try {
        const recipeData = await Recipe.create(req.body)

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// router.post('/', (req, res) => {
//     Recipe.create(req.body)
//       .then((recipe) => {
//         // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//         if (req.body.ingredientIds.length) {
//           const recipeIngArr = req.body.ingredientIds.map((ingredient_id) => {
//             return {
//               recipe_id: product.id,
//               ingredient_id,
//             };
//           });
//           return IngredientMap.bulkCreate(recipeIngArr);
//         }
//         // if no product tags, just respond
//         res.status(200).json(recipe);
//       })
//       .then((ingredientIds) => res.status(200).json(ingredientIds))
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   });

// GET route to view a single user by id
router.get('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id);

        if (!recipeData) {
            res.status(404).json('No recipe found with that id');
            return;
        };

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// PUT route to update a single user by id
router.put('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id);

        if (!recipeData) {
            res.status(404).json('No recipe found with that id');
            return;
        };

        recipeData.update(req.body);
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
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