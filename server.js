const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000


app.use(express.static('client'))
app.use(bodyParser.json());

let toDos = [];

let categories = [];

app.get('/todos', (req, res) => {
    res.send(toDos)
});

app.post('/todo', (req, res) => {
    if(req.body.todo){
        toDos = [...toDos, req.body.todo];
        res.status(200).send(toDos)
    } else {
        res.status(403).send({msg: 'Request Body must contain a todo'})
    }
});

app.put('/todo', (req, res) => {
    if(req.body.todo){
        const id = req.body.todo.id;
        const index = toDos.findIndex(item => item.id === id);
        toDos[index] = req.body.todo
        res.status(200).send(toDos)
    } else {
        res.status(403).send({msg: 'Request Body must contain a todo'})
    }
});

app.delete('/todo', (req, res) => {
    if(req.body.todo){
        const id = req.body.todo.id;
        const index = toDos.findIndex(item => item.id === id);
        toDos.splice(index, 1);
        res.status(200).send(toDos)
    } else {
        res.status(403).send({msg: 'Request Body must contain a todo'})
    }
});

app.get('/categories', (req, res) => {
    res.send(categories)
});

app.post('/category', (req, res) => {
    if(req.body.category){
        categories = [...categories, req.body.category];
        res.status(200).send(categories)
    } else {
        res.status(403).send({msg: 'Request Body must contain a category'})
    }
});

app.put('/category', (req, res) => {
    if(req.body.category){
        const id = req.body.category.id;
        const index = categories.findIndex(item => item.id === id);
        categories[index] = req.body.category
        res.status(200).send(categories)
    } else {
        res.status(403).send({msg: 'Request Body must contain a category'})
    }
});

app.delete('/category', (req, res) => {
    if(req.body.category){
        const id = req.body.category.id;
        const index = categories.findIndex(item => item.id === id);
        categories.splice(index, 1);
        res.status(200).send(categories)
    } else {
        res.status(403).send({msg: 'Request Body must contain a category'})
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
