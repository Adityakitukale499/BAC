const mongoose = require('mongoose');
const { Schema } = mongoose;

const auditSchema = new Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        required: true
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

// Adding a pre-save hook to update the updatedDate field
auditSchema.pre('save', function (next) {
    this.updatedDate = new Date();
    next();
});

// Creating a model from the schema
const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;
