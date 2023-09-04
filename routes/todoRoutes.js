const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//Crate a new to-do item
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Fetch all to-do items
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Update a to-do item by ID
router.put('/:id', async (req, res) => {
    try{
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete a to-do item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
        res.json(deleteTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;