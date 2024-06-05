const Employee = require('../models/Employee');

class EmployeeService {
    async addEmployee(employee) {
        try {
            employee.password = this.passwordEncryptor.encryptPassword(employee.password);
            return await Employee.create(employee);
        } catch (error) {
            throw error;
        }
    }

    async getEmployeeByEmail(email) {
        try {
            const employees = await Employee.find({ email });
            if (employees.length === 0) {
                throw new Error(`Employee with email ${email} not found.`);
            }
            return employees[0];
        } catch (error) {
            throw error;
        }
    }

    async deleteEmployee(id) {
        try {
            await Employee.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async updatePassword(id, password) {
        try {
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error(`Employee with id ${id} not found.`);
            }
            employee.password = this.passwordEncryptor.encryptPassword(password);
            employee.isPasswordTemp = false;
            await employee.save();
            return employee;
        } catch (error) {
            throw error;
        }
    }

    async getEmployees() {
        try {
            return await Employee.find();
        } catch (error) {
            throw error;
        }
    }

    async getEmployee(id) {
        try {
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error(`Employee with id ${id} not found.`);
            }
            return employee;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeService;
