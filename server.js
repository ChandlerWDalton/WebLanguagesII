const ToDo = require('./todo');
const Category = require('./category');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000
const mongoose = require('mongoose');
require('dotenv').config();
const uri = "";

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true
    }
)
.then(e => console.log('MongoDB Ready'))
.catch(console.error);


app.use(express.static('client'))
app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
    const toDos = await getToDos();
    res.send(toDos)
});

app.post('/todo', async (req, res) => {
    if(req.body.todo){
        const newTodo = new ToDo({
            ...req.body.todo
        })
        await newTodo.save().then(doc => {
            console.log('new todo saved to DB');
            console.log(doc)
        })
        res.status(200).send(await getToDos())
    } else {
        res.status(403).send({msg: 'Request Body must contain a todo'})
    }
});

app.put('/todo', async (req, res) => {
    if(req.body.todo){
        const id = req.body.todo.id;
        let todo = await ToDo.findOne({id});

        if(todo){
            todo.name = req.body.todo.name
            todo.done = req.body.todo.done
            await todo.save()
        }
        res.status(200).send(await getToDos())
    } else {
        res.status(403).send({msg: 'Request Body must contain a todo'})
    }
});

app.delete('/todo', async (req, res) => {
    if(req.body.todo){
        const id = req.body.todo.id;
        await ToDo.deleteOne({id});
        res.status(200).send(await getToDos());
    } else {
        res.status(403).send({msg: 'Request Body must contain a todo'})
    }
});

app.get('/categories', async (req, res) => {
    const categories = await getCategories();
    res.send(categories)
});

app.post('/category', async (req, res) => {
    if(req.body.category){
        const newCategory = new Category({
            ...req.body.category
        })
        await newCategory.save().then(doc => {
            console.log('new category saved to DB');
            console.log(doc)
        })
        res.status(200).send(await getCategories())
    } else {
        res.status(403).send({msg: 'Request Body must contain a category'})
    }
});

app.put('/category', async (req, res) => {
    if(req.body.category){
        const id = req.body.category.id;
        let category = await Category.findOne({id});
        if(category){
            category.name = req.body.category.name
            await category.save()
        }
        res.status(200).send(await getCategories())
    } else {
        res.status(403).send({msg: 'Request Body must contain a category'})
    }
});

app.delete('/category', async (req, res) => {
    if(req.body.category){
        const id = req.body.category.id;
        await Category.deleteOne({id});
        res.status(200).send(await getCategories());
    } else {
        res.status(403).send({msg: 'Request Body must contain a category'})
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

//DB

async function getToDos(){
    const allTodos = await ToDo.find()
    return allTodos
}

async function getCategories(){
    const allCategories = await Category.find();
    return allCategories;
}