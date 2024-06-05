const express = require('express');
const router = express.Router();
const employeeService = require('../services/Employee');

// GET /api/employees
router.get('/', async (req, res, next) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// POST /api/employees
router.post('/', async (req, res, next) => {
  try {
    const newEmployee = req.body;
    const addedEmployee = await employeeService.addEmployee(newEmployee);
    res.status(201).json(addedEmployee);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
