const express = require('express');
const router = express.Router();
const expenseService = require('../services/Expense');
const projectService = require('../services/Project');

router.get('/projectAmount/:pid', async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const expenseTotal = await expenseService.getExpenseTotal(pid);
        res.json(expenseTotal);
    } catch (err) {
        next(err);
    }
});

function getEmployee(req) {
    const auth = req.user; // Assuming user object is attached to request
    return auth;
}

router.get('/:eid', async (req, res, next) => {
    try {
        const id = req.params.eid;
        const expense = await expenseService.getExpense(id);
        const emp = getEmployee(req);
        if (
            expense.employee.id === emp.id ||
            expense.project.projectManager.id === emp.id ||
            emp.role === 'ADMIN'
        ) {
            res.json(expense);
        } else {
            throw new Error('Access Denied');
        }
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const expenseData = req.body;
        const emp = getEmployee(req);
        expenseData.employee = emp;
        expenseData.status = 'SUBMITTED';
        const project = await projectService.getProject(expenseData.project.id);
        if (emp.id === project.projectManager.id) {
            const addedExpense = await expenseService.addExpense(expenseData);
            res.status(201).json(addedExpense);
        } else {
            for (const userProject of emp.projects) {
                if (expenseData.project.id === userProject.id) {
                    const addedExpense = await expenseService.addExpense(expenseData);
                    res.status(201).json(addedExpense);
                    return;
                }
            }
            throw new Error('You are not part of the project');
        }
    } catch (err) {
        next(err);
    }
});

// Other routes are similar...

module.exports = router;
