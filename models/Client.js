const mongoose = require('mongoose');
const { Schema } = mongoose;
const Address = require('./Address');

const clientSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'Full name cannot be empty']
    },
    nickName: {
        type: String,
        required: [true, 'Nick name cannot be empty'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        unique: true,
        match: [/.+\@.+\..+/, 'Email is in wrong format']
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: [true, 'Address is required']
    },
    website: {
        type: String,
        required: [true, 'Website cannot be empty'],
        unique: true,
        match: [/^https:\/\//, 'Need https URL']
    },
    billDetails: String
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
