const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

// Express app intialization here
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Database connection with mongoose
mongoose.connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connection success'))
.catch((err) => console.log(err));

// Application all routes handle here by todoHandler
app.use('/todo', todoHandler);


// App default error handling here
function errorHandler(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error: err});
};


// App listenning here
app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT', PORT);
})