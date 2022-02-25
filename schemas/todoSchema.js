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


// Let's make instance here
todoSchema.methods = {
    findActive: function(){
        return mongoose.model("Todo").find({
            satus: 'active'
        });
    },
    
    findActiveCallback: function(cb){
        return mongoose.model("Todo").find({
            satus: 'active'
        }, cb);
    },
}

// Static methods
todoSchema.methods = {
    findByJS: function(){
        return this.find({title: /js/i});
    }
} 
// Export todoSchema here
module.exports = todoSchema;