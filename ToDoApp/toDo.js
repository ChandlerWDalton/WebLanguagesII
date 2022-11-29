//Html binding
const categoryAddDiv = document.querySelector('#category-add');
const addButton = document.querySelector('#add');
const addCategory = document.querySelector('#add-category');
const deleteAllButton = document.querySelector('#deleteAll');

const toDoListUI = document.querySelector('#toDoList');
const categoryUI = document.querySelector('#categoryList')
const statsUI = document.querySelector('#stats');


let toDoList = [];

let activeToDoList = [];
let activeCategoriesList = [];

let toDo = {
    name: '',
    done: false,
    id: '',
    categories: [],
    dueDate: ''
};

let categoryList = [];

let category = {
    id: '',
    name: '',
    color: ''
};

let toDoCategories = [];

deleteAllButton.onclick = () => {
    for(var i = toDoList.length - 1; i >= 0; i--){
        if(toDoList[i].done){
            toDoList.splice(i, 1);
        }
    }
    setActiveToDos();
};

addButton.onclick = () => {
    let newToDo = {...toDo};
    newToDo.id = Math.floor(1000 + Math.random() * 9000);
    newToDo.name = document.querySelector('#newToDoName').value;
    newToDo.categories = [...toDoCategories];
    toDoList = [newToDo, ...toDoList];
    setActiveToDos();
};

addCategory.onclick = () => {
    let newCategory = {...category};
    newCategory.id = Math.floor(1000 + Math.random() * 9000);
    newCategory.name = document.querySelector('#newCategoryName').value;
    newCategory.color = document.querySelector('#newCategoryColor').value;
    categoryList = [newCategory, ...categoryList];
    updateCategoryDisplay();
};

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
};

function editToDo(newName, id){
    const index = toDoList.findIndex(item => item.id === id);
    toDoList[index].name = newName;
    setActiveToDos();
}

function editCategoryClick(id){
    const index = categoryList.findIndex(item => item.id === id);
    const editDiv = document.querySelector(`#category${id}`)
    editDiv.innerHTML = '';
    //Create Edit Field
    let editInput = document.createElement('input');
    editInput.setAttribute('id', `editingCategory${id}`)
    editInput.setAttribute('type', 'text');
    editInput.setAttribute('placeholder', categoryList[index].name);
    //Create Edit Confirm Button
    let editButton = document.createElement('button');
    editButton.innerText = 'Done';
    editButton.setAttribute('onclick', `editCategory(document.querySelector('#editingCategory${id}').value, ${id})`)

    editDiv.appendChild(editInput);
    editDiv.appendChild(editButton);
};

async function activateCategory(id){
    const index = activeCategoriesList.findIndex(item => item.id === id);
    const category = document.querySelector(`#category${id}`)
    if (index !== -1){
        activeCategoriesList.splice(index, 1)
        category.style.border = "0px solid #000000";
    } else {
        const categoriesIndex = categoryList.findIndex(item => item.id === id);
        if(categoriesIndex !== -1){
            activeCategoriesList = [categoryList[categoriesIndex],  ...activeCategoriesList];
            category.style.border = "1px solid #FFFFFF";
        }
    }
    setActiveToDos();
}

async function setActiveToDos(){
    activeToDoList = [];
    for(const todo of toDoList ){
        const result = await checkIfActiveToDo(todo);
        if(result){
            activeToDoList = [todo, ...activeToDoList];
        }
    }
    updateDisplay();
}

async function checkIfActiveToDo(todo){
    for(const toDoCategory of todo.categories){
        for(const category of activeCategoriesList){
            if(category.id === toDoCategory.id){
                return true
            }
        }
    }
    return false
}

function editCategory(newName, id){
    const index = categoryList.findIndex(item => item.id === id);
    categoryList[index].name = newName;
    if(activeCategoriesList.length > 0){
        const activeIndex = activeCategoriesList.findIndex(item => item.id === id);
        if(activeIndex !== -1){
            activeCategoriesList[activeIndex].name = newName;
        }
    }
    updateCategoryDisplay();
    for(const todo of toDoList){
        for(let i = 0; i < todo.categories.length; i++){
            if(todo.categories[i].id === id){
                todo.categories[i].name = newName;
            }
        }
    }
    setActiveToDos();
}

function addToDoCategory(id){
    const button = document.querySelector(`#toDoCategory${id}`);
    const index = toDoCategories.findIndex(item => item.id === id);
    if(index !== -1){
        toDoCategories.splice(index, 1);
        button.style.backgroundColor = 'gray'
    } else {
        const categoriesIndex = categoryList.findIndex(item => item.id === id);
        toDoCategories = [categoryList[categoriesIndex],  ...toDoCategories];
        button.style.backgroundColor = categoryList[categoriesIndex].color;
    }
}

function deleteToDo(id){
    const index = toDoList.findIndex(item => item.id === id);
    toDoList.splice(index, 1);
    setActiveToDos();
}

function deleteCategory(id){
    const index = categoryList.findIndex(item => item.id === id);
    categoryList.splice(index, 1);
    if(activeCategoriesList.length > 0){
        const activeIndex = activeCategoriesList.findIndex(item => item.id === id);
        if(activeIndex !== -1){
            activeCategoriesList.splice(activeIndex, 1);
        }

    }
    updateCategoryDisplay();
    for(const todo of toDoList){
        for(let i = 0; i < todo.categories.length; i++){
            if(todo.categories[i].id === id){
                todo.categories.splice(i, 1);
            }
        }
    }
    setActiveToDos();
}

function completeToDo(id){
    const index = toDoList.findIndex(item => item.id === id);
    toDoList[index].done = !toDoList[index].done
    setActiveToDos();
}

function updateDisplay(){
    if(activeCategoriesList.length < 1){
        activeToDoList = [...toDoList];
    }
    toDoListUI.innerHTML = '';
    for (const item of activeToDoList){
        let newLi = document.createElement('li');
        let newLiDiv = document.createElement('div');
        newLiDiv.setAttribute('id', `task${item.id}`)
        newLi.setAttribute('class', 'task-container')

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

        let categories = document.createElement('div');
        categories.setAttribute('class', 'task-categories')
        for (const category of item.categories){
            let newDot = document.createElement('span');
            newDot.setAttribute('class', 'fa fa-circle');
            newDot.style.color = category.color
            categories.appendChild(newDot)
        }


        // Append Div to list
        newLi.appendChild(newLiDiv);
        newLi.appendChild(categories);
        toDoListUI.appendChild(newLi);
    }
    calculateTasksLeft();
}

function updateCategoryDisplay(){
    categoryUI.innerHTML = '';
    categoryAddDiv.innerHTML = '';
    for (const item of categoryList){
        let newLi = document.createElement('li');
        let newLiDiv = document.createElement('div');
        newLiDiv.setAttribute('id', `category${item.id}`)
        newLiDiv.setAttribute('class', 'category-container')
        newLiDiv.style.backgroundColor = item.color

        // Category attributes
        let newName = document.createElement('p')
        newName.innerText = item.name;
        newLiDiv.appendChild(newName);

        let actions = document.createElement('div');

        let newPencil = document.createElement('span');
        newPencil.setAttribute('class', 'fa fa-pencil')
        newPencil.setAttribute('onclick', `editCategoryClick(${item.id})`)
        actions.appendChild(newPencil);
        let newTrash = document.createElement('span');
        newTrash.setAttribute('class', 'fa fa-trash-o')
        newTrash.setAttribute('onclick', `deleteCategory(${item.id})`)
        actions.appendChild(newTrash);

        newLiDiv.appendChild(actions)

        // Append Div to list
        newLi.appendChild(newLiDiv);
        newLi.setAttribute('onclick', `activateCategory(${item.id})`)
        categoryUI.appendChild(newLi);

        //Add buttons to To Do UI
        let newButton = document.createElement('button');
        newButton.innerText = item.name;
        newButton.setAttribute('id', `toDoCategory${item.id}`)
        newButton.setAttribute('onclick', `addToDoCategory(${item.id})`);
        newButton.style.backgroundColor = 'gray';
        categoryAddDiv.appendChild(newButton);
    }
}

function calculateTasksLeft(){
    const uncompleted = toDoList.filter(item => !item.done)
    statsUI.innerText = `${uncompleted.length} tasks left to complete`

}