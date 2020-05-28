const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const show = console.log
const PORT = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODBURI;
const methodOverride = require('method-override');
const Todo = require('./models/todo.js')

//DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/unit2assessment';

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//MONGOOSE CONNECTION
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true });

//ERROR AND SUCCESS
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on('open' , ()=>{});

//ROUTE

const todoList = []

//INDEX ROUTE
app.get('/todo/', (req, res) => {
    Todo.find({}, (error, allTodos) => {
        res.render('Index', {
            todo: allTodos,
            todoList: allTodos
        })
    });
});

//CREATE ROUTE
app.post('/todo/', (req, res) => {
    Todo.create(req.body, (error, createdTodo) => {
        show(todoList)
        if(error) {
            show(error)
        } else {
            res.redirect('/todo/')
            todoList.push(req.body)
        }
        show(todoList)
    })
})

//DELETE
app.delete('/todo/:id', (req, res) => {
    show(todoList)
    Todo.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/todo/')
        todoList.pop()
    }) 
    show(todoList)
})

//LISTEN
app.listen(3000, () => {
    console.log('listening on: ' + 3000);
});