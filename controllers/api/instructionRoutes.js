const router = require('express').Router();
const { Instruction } = require('../../models');

// GET route to view all instructions
router.get('/', async (req, res) => {
    try {
        const instructionData = await Instruction.findAll();

        if (!instructionData) {
            res.status(404).json('No instructions to display');
        };

        res.status(200).json(instructionData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// POST route to add a single instruction
router.post('/', async (req, res) => {
    try {
        const instructionData = await Instruction.create(body.req)

        res.status(200).json(instructionData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// GET route to view a single instruction by id
router.get('/:id', async (req, res) => {
    try {
        const instructionData = await Instruction.findByPk(req.params.id);

        if (!instructionData) {
            res.status(404).json('No instruction found with that id');
            return;
        };

        res.status(200).json(instructionData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// PUT route to update a single ingredient by id
router.put('/:id', async (req, res) => {
    try {
        const instructionData = await Instruction.findByPk(req.params.id);

        if (!instructionData) {
            res.status(404).json('No instruction found with that id');
            return;
        };

        instructionData.update(req.body);
        res.status(200).json(instructionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a single ingredient by id
router.delete('/:id', async (req, res) => {
    try {
        const instructionData = await Instruction.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!instructionData) {
            res.status(404).json('No instruction found with that id');
            return;
        };

        res.status(200).json(instructionData);
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;