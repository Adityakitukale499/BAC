const express = require('express');
const router = express.Router();
const clientService = require('../services/client');
// const { validateClient } = require('../validators/clientValidator');

router.get('/', async (req, res, next) => {
    try {
        const clients = await clientService.getClients();
        res.json(clients);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const client = await clientService.getClient(id);
        res.json(client);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const clientData = req.body;
        const newClient = await clientService.addClient(clientData);
        res.status(201).json(newClient);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedClient = await clientService.updateClient(id, updates);
        res.json(updatedClient);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await clientService.deleteClient(id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
