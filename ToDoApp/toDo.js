//Html binding
const addButton = document.querySelector('#add');
const deleteAllButton = document.querySelector('#deleteAll')

const toDoListUI = document.querySelector('#toDoList');
const statsUI = document.querySelector('#stats');


let toDoList = []

let toDo = {
    name: '',
    done: false,
    id: '',
    categories: [],
    dueDate: ''
}

deleteAllButton.onclick = () => {
    for(var i = toDoList.length - 1; i >= 0; i--){
        if(toDoList[i].done){
            toDoList.splice(i, 1);
        }
    }
    updateDisplay();
}

addButton.onclick = () => {
    let newToDo = {...toDo};
    newToDo.id = Math.floor(1000 + Math.random() * 9000);
    newToDo.name = document.querySelector('#newToDoName').value;
    toDoList = [newToDo, ...toDoList];
    updateDisplay();
}

function editClick(id){
    const index = toDoList.findIndex(item => item.id === id);
    const editDiv = document.querySelector(`#task${id}`)
    editDiv.innerHTML = '';
    //Create Edit Field
    let editInput = document.createElement('input');
    editInput.setAttribute('id', `editingTask${id}`)
    editInput.setAttribute('type', 'text');
    editInput.setAttribute('placeholder', toDoList[index].name);
    //Create Edit Confirm Button
    let editButton = document.createElement('button');
    editButton.innerText = 'Done';
    editButton.setAttribute('onclick', `editToDo(document.querySelector('#editingTask${id}').value, ${id})`)

    editDiv.appendChild(editInput);
    editDiv.appendChild(editButton);
}

function editToDo(newName, id){
    const index = toDoList.findIndex(item => item.id === id);
    toDoList[index].name = newName;
    updateDisplay();
}

function deleteToDo(id){
    const index = toDoList.findIndex(item => item.id === id);
    toDoList.splice(index, 1);
    updateDisplay();
}

function completeToDo(id){
    const index = toDoList.findIndex(item => item.id === id);
    toDoList[index].done = !toDoList[index].done
    updateDisplay();
}

function updateDisplay(){
    toDoListUI.innerHTML = '';
    for (const item of toDoList){
        let newLi = document.createElement('li');
        let newLiDiv = document.createElement('div');
        newLiDiv.setAttribute('id', `task${item.id}`)
        newLiDiv.setAttribute('class', 'task-container')

        // Task attributes
        let newName = document.createElement('p')
        newName.innerText = item.name;
        if(item.done){
            let newStrike = document.createElement('strike');
            newStrike.appendChild(newName);
            newLiDiv.appendChild(newStrike);
        } else {
            newLiDiv.appendChild(newName);
        }

        let actions = document.createElement('div');

        let newCheck = document.createElement('span');
        newCheck.setAttribute('class', 'fa fa-check')
        newCheck.setAttribute('onclick', `completeToDo(${item.id})`)
        actions.appendChild(newCheck);
        let newPencil = document.createElement('span');
        newPencil.setAttribute('class', 'fa fa-pencil')
        newPencil.setAttribute('onclick', `editClick(${item.id})`)
        actions.appendChild(newPencil);
        let newTrash = document.createElement('span');
        newTrash.setAttribute('class', 'fa fa-trash-o')
        newTrash.setAttribute('onclick', `deleteToDo(${item.id})`)
        actions.appendChild(newTrash);

        newLiDiv.appendChild(actions)

        // Append Div to list
        newLi.appendChild(newLiDiv);
        toDoListUI.appendChild(newLi);
    }
    calculateTasksLeft();
}

function calculateTasksLeft(){
    const uncompleted = toDoList.filter(item => !item.done)
    statsUI.innerText = `${uncompleted.length} tasks left to complete`

}