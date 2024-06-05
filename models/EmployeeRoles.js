const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeRoles = ['USER', 'PRJ_MANAGER', 'ADMIN'];

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: employeeRoles,
        required: true,
        default: 'USER'
    }
    // Add other fields as required
});

const EmployeeRoles = mongoose.model('Employee', employeeSchema);
module.exports = EmployeeRoles;
