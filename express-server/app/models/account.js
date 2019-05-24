var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Account', {
    name: {
        type: String,
        default: ''
    },

    balance: {
        type: String,
        default: '0'
    }


});
