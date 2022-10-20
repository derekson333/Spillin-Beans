const router = require('express').Router();
const { User, Recipe } = require('../models');

// GET route to render the homepage
router.get('/', (req, res) => {
    try {
        res.status(200).render('homepage', {});
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

        res.status(200).render('login', {});
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
router.get('/results', (req, res) => {
    try {
        res.status(200).render('results', {});
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET route to render the user profile page by id
router.get('/users/:id', (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        res.status(200).render('profile', { 
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET route to render the recipe view page by id
router.get('/recipes/:id', (req, res) => {
    try {
        const id = req.params.id;
        res.status(200).render('recipe', {id});
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router; 