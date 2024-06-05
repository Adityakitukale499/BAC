const mongoose = require('mongoose');
const { Schema } = mongoose;
const Employee = require('./Employee');
const Project = require('./Project');
const Document = require('./Document');

const expenseSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    billable: {
        type: Boolean,
        required: true
    },
    reimburseable: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    taxZone: {
        type: String,
        default: 'DEFAULT_TAX_ZONE'
    },
    tax: {
        type: Number
    },
    attachments: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }],
    status: {
        type: String,
        enum: ['SUBMITTED', 'APPROVED', 'REJECTED'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
