const mongoose = require('mongoose');

// Todo database schema design
const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    status:{
        type: String,
        enum: ['active', 'inactive']
    },
    date:{
        type: Date,
        default: Date.now
    }
});


// Export todoSchema here
module.exports = todoSchema;