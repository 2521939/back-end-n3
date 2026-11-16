const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Cria uma nova Tarefa se tiver sucesso 201 - Criado, se não 400 - Bad Request Solicitação Invalida
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get de todas Tarefas, 200 - Sucesso se não 500 - Internal Server Error
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get de Tarefa por id, 200 - Sucesso, 404 - Não encontrado, 500 - Internal Server Error
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Tarefa não encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

// Update de Tarefa por ID, se tarefa vazia 404 - Não encontrado, 400 - Bad Request
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete de uma Tarefa por ID, se tarefa vazia 404 - Não encontrado, 500 - Internal Server Error
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;