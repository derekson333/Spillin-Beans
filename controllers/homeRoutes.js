const router = require('express').Router();
const { User, Recipe, Ingredient, IngredientMap, Instruction, InstructionMap } = require('../models');
const withAuth = require('../utils/auth')

// GET route to render the homepage
router.get('/', async (req, res) => {
    try {
        const usersData = await User.findAll()
        const users = usersData.map((user) => user.get({ plain: true }))

        const recipesData = (await Recipe.findAll({
            include: {
                model: User,
                attributes: ['user_name']
            }
        })).slice(0, 8);
        const recipes = recipesData.map((recipe) => recipe.get({ plain: true }))
        
        res.status(200).render('homepage', { 
            users, 
            recipes,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to render the login page
router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect(`/users/${req.session.user_id}`);
            return;
        };

        res.status(200).render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to render the sign up page
router.get('/signup', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        };

        res.status(200).render('signup', {});
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET route to render the search results page
// We may need to add another route to separate user searches from recipe searches
router.get('/results', withAuth, (req, res) => {
    try {
        res.status(200).render('results', {});
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET route to render the add recipe form page
router.get('/addrecipe', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id)
        const ingredientData = await Ingredient.findAll()
        const instructionData = await Instruction.findAll()
        const ingredients = ingredientData.map((ingredient) => ingredient.get({ plain: true }))
        const instructions =instructionData.map((instruction) => instruction.get({ plain: true }))
        const user = userData.get({ plain: true })
        res.status(200).render('recipeform', {
            ingredients,
            instructions,
            user,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        })
    } catch (err) {
        res.json(err)
    }
});

// GET route to render the user profile page by id
router.get('/users/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: {
                model: Recipe
            },
            attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        res.status(200).render('profile', { 
            ...user,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            my_profile: req.params.id == req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET route to render the recipe view page by id
router.get('/recipes/:id', withAuth, async (req, res) => {
    try {
        // Get ALL recipes
        const recipesData = await Recipe.findAll({
            include: {
                model: User,
                attributes: ['user_name']
            }
        });
        const recipeData = await Recipe.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                },
                {
                    model: Ingredient,
                    through: IngredientMap                
                },
                {
                    model: Instruction,
                    through: InstructionMap
                }
            ],
        });
        const recipes = recipesData.map((recipe) => recipe.get({ plain: true })).slice(0,6)
        const recipe = recipeData.get({ plain: true});

        res.status(200).render('recipe', {
            ...recipe, 
            recipes,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router; 