const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    description: {
        type: String,
        maxlength: 500,
        default: '',
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isSoonDue: {
        type: Boolean,
        default: false,
    },
    projectManager: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    projectName: {
        type: String,
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED', 'ON_HOLD'],
        required: true,
    },
    teamMembers: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    }],
    attachments: [{
        type: Schema.Types.ObjectId,
        ref: 'Document',
    }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
