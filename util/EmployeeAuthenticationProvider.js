const BasicPasswordEncryptor = require('bcrypt');
const EmployeeService = require('../services/Employee');

class EmployeeAuthenticationProvider {
    constructor() {
        this.employeeService = new EmployeeService();
    }

    async authenticate(authentication) {
        const username = authentication.getPrincipal() + "";
        const password = authentication.getCredentials() + "";

        let employee;
        try {
            employee = await this.employeeService.getEmployeeByEmail(username);
        } catch (e) {
            throw new Error("Email doesn't exist !!");
        }

        const passwordMatches = await this.checkPassword(password, employee.password);
        if (!passwordMatches) {
            throw new Error("Password incorrect !!");
        }

        return employee;
    }

    async checkPassword(password, hashedPassword) {
        return await BasicPasswordEncryptor.compare(password, hashedPassword);
    }

    supports(auth) {
        return auth === UsernamePasswordAuthenticationToken;
    }
}

module.exports = EmployeeAuthenticationProvider;
