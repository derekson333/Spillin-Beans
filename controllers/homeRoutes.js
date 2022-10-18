const router = require('express').Router();

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
        res.status(200).render('login', {});
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to render the sign up page
router.get('/signup', (req, res) => {
    try {
        res.status(200).render('signup', {});
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET route to render the search results page
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
        const id = req.params.id;
        res.status(200).render('profile', {id});
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