const mongoose = require('mongoose');
const { Schema } = mongoose;
const Employee = require('./Employee');

const documentSchema = new Schema({
    docName: {
        type: String,
        required: true
    },
    file: {
        type: Buffer,
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
