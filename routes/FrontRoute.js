const express = require('express');
const router = express.Router();
const EmployeeAuthenticationProvider = require('../util/EmployeeAuthenticationProvider');
const JwtUtil = require('../util/JwtUtil');
const EmployeeService = require('../services/Employee');
const BasicPasswordEncryptor = require('jasypt').BasicPasswordEncryptor;

const authenticationProvider = new EmployeeAuthenticationProvider();
const jwtTokenUtil = new JwtUtil();
const employeeService = new EmployeeService();

router.post('/authenticate', async (req, res, next) => {
    try {
        const authenticationRequest = req.body;
        const auth = await authenticationProvider.authenticate(
            new UsernamePasswordAuthenticationToken(
                authenticationRequest.username,
                authenticationRequest.password
            )
        );
        const employee = auth.principal;
        const jwt = jwtTokenUtil.generateToken(employee);
        res.json({
            jwt,
            id: employee.id,
            email: employee.email,
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            isPasswordTemp: employee.isPasswordTemp,
        });
    } catch (err) {
        next(err);
    }
});

router.post('/change_password', async (req, res, next) => {
    try {
        const updatePasswordRequest = req.body;
        const passwordEncryptor = new BasicPasswordEncryptor();
        const auth = req.user;
        let employee = auth.principal;

        if (
            passwordEncryptor.checkPassword(
                updatePasswordRequest.old_password,
                employee.password
            ) &&
            updatePasswordRequest.new_password ===
            updatePasswordRequest.confirm_password &&
            updatePasswordRequest.new_password !==
            updatePasswordRequest.old_password
        ) {
            employee = await employeeService.updatePassword(
                employee.id,
                updatePasswordRequest.new_password
            );
            const oldJwt = auth.details;
            JwtUtil.blacklist.add(oldJwt);
            const jwt = jwtTokenUtil.generateToken(employee);
            res.json({
                jwt,
                id: employee.id,
                email: employee.email,
                firstName: employee.firstName,
                lastName: employee.lastName,
                role: employee.role,
                isPasswordTemp: employee.isPasswordTemp,
            });
        } else {
            throw new Error(
                'Please confirm password and ensure it is not the same as the old one!'
            );
        }
    } catch (err) {
        next(err);
    }
});

router.get('/logout', async (req, res, next) => {
    try {
        const oldJwt = req.user.details;
        JwtUtil.blacklist.add(oldJwt);
        res.json('Successfully Logged out!');
    } catch (err) {
        next(err);
    }
});

router.get('/authenticate_jwt', async (req, res, next) => {
    try {
        res.json('Successfully Authenticated');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
