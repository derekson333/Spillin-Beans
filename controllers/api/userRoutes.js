const router = require('express').Router();
const { User, Recipe } = require('../../models');

// GET route to view all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();

        if (!userData) {
            res.status(404).json('No users to display');
        };

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});


// POST route to add a single user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(body.req)

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// GET route to view a single user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if (!userData) {
            res.status(404).json('No user found with that id');
            return;
        };

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// PUT route to update a single user by id
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if (!userData) {
            res.status(404).json('No user found with that id');
            return;
        };

        userData.update(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a single user by id
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!userData) {
            res.status(404).json('No user found with that id');
            return;
        };

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    };
});

// GET route to view all recipes belonging to a user by id
router.get('/:id/recipes', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if (!userData) {
            res.status(404).json('No user with that id');
        };

        const recipes = await Recipe.findAll({
            where: {
                user_id: req.params.id,
            }
        });

        if (recipes.length === 0) {
            res.status(404).json('There are no recipes by this user');
        };

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router; 