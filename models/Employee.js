const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['USER', 'PRJ_MANAGER', 'ADMIN'],
        default: 'USER',
    },
    isPasswordTemp: {
        type: Boolean,
        default: true,
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project',
    }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
