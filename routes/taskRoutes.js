const express = require('express');
const Task = require('../model/task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// CREATE a new task
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newTask = new Task({ userId: req.user.id, title: req.body.title });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create task' });
    }
});

// UPDATE a task (mark as done/undone)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, 
            { completed: req.body.completed }, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update task' });
    }
});

// DELETE a task
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;