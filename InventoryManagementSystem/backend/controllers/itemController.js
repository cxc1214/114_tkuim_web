const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Public
const createItem = async (req, res) => {
    const { name, quantity, price, category, description, image } = req.body;

    if (!name || !quantity || !price || !category) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    try {
        const newItem = await Item.create({
            name,
            quantity,
            price,
            category,
            description: description || '',
            image: image || '',
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Public
const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Public
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: `Item ${req.params.id} deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};
