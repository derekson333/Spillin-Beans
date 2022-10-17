const router = require('express').Router();

// GET route to render the homepage
router.get('/', (req, res) => {
    try {
        res.status(200).send('This is the Recipe App homepage.')
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;