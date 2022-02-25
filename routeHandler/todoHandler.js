const express = require('express');
const router = express.Router();

// Todo schema model
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);

// Get all todos here
router.get('/', async (req, res) => {
    await Todo.find({}),select({
        _id: 0,
        date: 0
    }).limit(5).exec((err, data) => {
        if(err){
            res.status(500).json({
                Error: 'There was a server side error!',
            });
        }else{
            res.status(200).json({
                result: data,
                message: 'Successfully got all Todos!',
            })
        }
    });
});

// Get a todo by id here
router.get('/:id', async (req, res) => {
    await Todo.find({_id: req.params.id}, (err, data) => {
        if(err){
            res.status(500).json({
                Error: 'There was a server side error!',
            });
        }else{
            res.status(200).json({
                result: data,
                message: 'Successfully got the single Todo!',
            })
        }
    });
});

// Post a todo here
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side error!',
            });
        }else{
            res.status(200).json({
                message: "Todo was inserted successfully!"
            });
        }
    })
});

// Post mutiple todo here
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if(err){
            res.status(500).json({
                Error: 'There was a server side error!',
            });
        }else{
            res.status(200).json({
                message: 'Data inserted successfully!',
            })
        }
    });
});

// Update a todo by here
router.put('/:id', async (req, res) => {
    const uniqueId = req.params.id;
    const result = await Todo.findByIdAndUpdate({_id: uniqueId}, {
        $set:{
            status: 'active'
        }
    },
    {   
        new: true,
        useFindAndModify: false
    }, 
    (err) => {
        if(err){
            res.status(500).json({
                Error: 'There was a server side error!',
            });
        }else{
            res.status(500).json({
                message: 'Todo Updated successfully!'
            });
        }
    });

    console.log(result);
});

// Delete a todo by id here
router.delete('/:id', async (req, res) => {
    const uniqueId = req.params.id;
    Todo.deleteOne({_id: uniqueId}, (err) => {
        if(err){
            res.status(500).json({
                Error: 'There was server side error!'
            });
        }else{
            res.status(200).json({
                Message: 'Todo deleted successfully!',
            });
        }
    });
});

// Export the router here
module.exports = router;