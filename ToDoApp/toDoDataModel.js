toDoList = []

toDo = {
    name: '',
    status: '',
    id: '',
    categories: [],
    dueDate: ''
}

function editToDo(toDo, index){
    toDoList[index] = {...toDo};
}

function deleteToDo(index){
    toDoList.splice(index, 1)
}