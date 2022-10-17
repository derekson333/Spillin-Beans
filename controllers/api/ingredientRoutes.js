const router = require('express').Router();
const { Ingredient } = require('../../models');

// GET route to view all ingredients
router.get('/', async (req, res) => {
    try {
        const ingredientData = await Ingredient.findAll();

        if (!ingredientData) {
            res.status(404).json('No ingredients to display');
        };

        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(500).json(err);
    };
});


// POST route to add a single ingredient
router.post('/', async (req, res) => {
    try {
        const ingredientData = await Ingredient.create(body.req)

        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// GET route to view a single ingredient by id
router.get('/:id', async (req, res) => {
    try {
        const ingredientData = await Ingredient.findByPk(req.params.id);

        if (!ingredientData) {
            res.status(404).json('No ingredient found with that id');
            return;
        };

        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// PUT route to update a single ingredient by id
router.put('/:id', async (req, res) => {
    try {
        const ingredientData = await Ingredient.findByPk(req.params.id);

        if (!ingredientData) {
            res.status(404).json('No ingredient found with that id');
            return;
        };

        ingredientData.update(req.body);
        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a single ingredient by id
router.delete('/:id', async (req, res) => {
    try {
        const ingredientData = await Ingredient.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!ingredientData) {
            res.status(404).json('No ingredient found with that id');
            return;
        };

        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;