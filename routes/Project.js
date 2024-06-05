const express = require('express');
const router = express.Router();
const ProjectService = require('../services/Project');

const projectService = new ProjectService();

router.post('/', async (req, res, next) => {
    try {
        const p = req.body;
        const project = await projectService.addProject(p);
        res.status(201).json(project);
    } catch (err) {
        next(err);
    }
});

router.get('/:prj_id', async (req, res, next) => {
    try {
        const id = req.params.prj_id;
        const project = await projectService.getProject(id);
        res.json(project);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const page = req.query.page || -1;
        const size = req.query.size || -1;
        const projects = await projectService.getProjectsByUser(page, size);
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

router.delete('/:prj_id', async (req, res, next) => {
    try {
        const id = req.params.prj_id;
        await projectService.deleteProject(id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const ids = req.body;
        await projectService.deleteProjects(ids);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const updates = req.body;
        const id = req.params.id;
        const project = await projectService.updateProject(updates, id);
        res.json(project);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
