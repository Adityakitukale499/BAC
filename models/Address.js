const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    addressLine1: {
        type: String,
        required: [true, 'Address Line 1 cannot be empty']
    },
    addressLine2: String,
    city: {
        type: String,
        required: [true, 'City cannot be empty']
    },
    state: {
        type: String,
        required: [true, 'State cannot be empty']
    },
    country: {
        type: String,
        required: [true, 'Country cannot be empty']
    },
    zipcode: {
        type: String,
        required: [true, 'Zipcode cannot be empty']
    },
    telephone1: {
        type: String,
        required: [true, 'Telephone 1 cannot be empty']
    },
    telephone2: String,
    fax: String
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
