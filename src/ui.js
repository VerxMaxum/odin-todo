import { typeProject, enterProject} from './addProject.js';
import { deleteProject } from './deleteProject.js';
import { loadProjects } from './storage.js';
import { addTask, deleteTask, modifyDone, updateTask } from './task.js';

export function control() {

    loadProjects();
    loadDefault();
    const dialog1 = document.querySelector('dialog:nth-of-type(1)');
    const dialog2 = document.querySelector('dialog:nth-of-type(2)');

    const addProjectButton = document.querySelector('#add-container > button');
    const delProjButtons = Array.from(document.querySelectorAll('.project > button'));

    addProjectButton.addEventListener("click", typeProject);
    delProjButtons.forEach((button) => {
        button.addEventListener("click", deleteProject);
    });

    const openAddTodo = document.querySelector('.add-todo > button');
    openAddTodo.addEventListener("click", openAddTask);
    
    const projList = Array.from(document.getElementsByClassName('project'));
    projList.forEach((project) => {
        project.addEventListener("click", loadSelected);
    });

    const addTodo = document.querySelector('.button-action > button:first-child');
    addTodo.addEventListener("click", addTask);

    const cancelAdd = document.querySelector('.button-action > button:last-child');
    cancelAdd.addEventListener("click", () => {
        dialog1.close();
    });

    const cancelEdit = document.querySelector('#edit .button-action > button:last-child');
    cancelEdit.addEventListener("click", () => {
        dialog2.close();
    });

    const editTodo = document.querySelector("#edit .button-action > button:first-child");
    editTodo.addEventListener("click", updateTask);
    editTodo.addEventListener("click", () => {
        dialog2.close();
    })

    function openAddTask() {
        const addDialog = document.querySelector('.dialog-form#add-todo');
        addDialog.showModal();
    }

    function loadDefault() {
        const todoContainer = document.getElementById('todo-container');
        todoContainer.replaceChildren();
        const def = JSON.parse(localStorage.getItem("0"));
        const openAddTodoDF = document.querySelector('.add-todo > button');
        openAddTodoDF.setAttribute("data", "0");
        const addTodoDF = document.querySelector('.button-action > button:first-child');
        addTodoDF.setAttribute("data", "0");

        var taskList = def.tasks;
        for(let task of taskList) {
            let todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            if(task.priority == "3")
                todoItem.style.borderLeft = "5px #DA0463 solid";
            else if(task.priority == "2")
                todoItem.style.borderLeft = "5px #da8404 solid";
            else if(task.priority == "1")
                todoItem.style.borderLeft = "5px #04da44 solid";
            else if(task.priority == "0")
                todoItem.style.borderLeft = "5px #5f5f5f solid";

            let checkmark = document.createElement('div');
            checkmark.classList.add('checkmark');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'done';
            checkbox.addEventListener("click", markDone);
            checkbox.addEventListener("click", markNotDone);
            checkbox.setAttribute("index", taskList.indexOf(task));
            checkbox.setAttribute("loaded", "0");
            
            checkmark.appendChild(checkbox);

            let details = document.createElement('div');
            details.classList.add('todo-details');
            let todoTitle = document.createElement('p');
            todoTitle.classList.add('title');
            todoTitle.textContent = task.title;
            let todoDue = document.createElement('p');
            todoDue.classList.add('due');
            todoDue.textContent = task.due;
            details.appendChild(todoTitle);
            details.appendChild(todoDue);

            let addDelete = document.createElement('div');
            addDelete.classList.add('add-delete');
            let trash = document.createElement('button');
            trash.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" index=${taskList.indexOf(task)} loaded="0">
                                <path index=${taskList.indexOf(task)} loaded="0" d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>`;
            trash.addEventListener("click", deleteTask)
            trash.setAttribute("index", taskList.indexOf(task));
            trash.setAttribute("loaded", "0");
            trash.children[0].addEventListener("click", deleteTask);
            
            let edit = document.createElement('button');
            edit.innerHTML = `<svg index=${taskList.indexOf(task)} loaded="0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path index=${taskList.indexOf(task)} loaded="0" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>`;
            edit.setAttribute("index", taskList.indexOf(task));
            edit.setAttribute("loaded", "0");
            edit.children[0].addEventListener("click", () => {
                const editButton = document.querySelector('#edit .button-action > button:first-child');
                console.log(editButton);
                editButton.setAttribute("loaded", "0");
                editButton.setAttribute("index", taskList.indexOf(task))
                dialog2.showModal();
            });

            addDelete.appendChild(trash);
            addDelete.appendChild(edit);
            
            todoItem.appendChild(checkmark);
            todoItem.appendChild(details);
            todoItem.appendChild(addDelete);

            if(task.done === "1") {
                checkbox.checked = true;
                todoItem.style.backgroundColor = "gray";
            }
            else if(task.done === "0")
                checkbox.checked = false;

            todoContainer.appendChild(todoItem);
        }
    }
}

export function loadSelected(event) {
    const todoContainer = document.getElementById('todo-container');
    todoContainer.replaceChildren();
    console.log(event.target);
    let projId;
    if(event.target.getAttribute("data") !== null)
        projId = event.target.getAttribute("data");
    else projId = event.target.parentElement.getAttribute("data");
    const openAddTodoLS = document.querySelector('.add-todo > button');
    openAddTodoLS.setAttribute("data", projId);
    console.log("In ui load selected: " + projId);
    const addTask = document.querySelector('.button-action > button:first-child');
    addTask.setAttribute("data", projId);
    var project = JSON.parse(localStorage.getItem(projId));
    if(project !== null) {
        var taskList = project.tasks;
        for(let task of taskList) {
            let todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.setAttribute("index", taskList.indexOf(task));
            console.log(task.priority);
            if(task.priority == "3")
                todoItem.style.borderLeft = "5px #DA0463 solid";
            else if(task.priority == "2")
                todoItem.style.borderLeft = "5px #da8404 solid";
            else if(task.priority == "1")
                todoItem.style.borderLeft = "5px #04da44 solid";
            else if(task.priority == "0")
                todoItem.style.borderLeft = "5px #5f5f5f solid";

            let checkmark = document.createElement('div');
            checkmark.classList.add('checkmark');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'done';
            checkbox.addEventListener("click", markDone);
            checkbox.addEventListener("click", markNotDone);
            checkbox.setAttribute("index", taskList.indexOf(task));
            checkbox.setAttribute("loaded", projId);
            checkmark.appendChild(checkbox);

            let details = document.createElement('div');
            details.classList.add('todo-details');
            let todoTitle = document.createElement('p');
            todoTitle.classList.add('title');
            todoTitle.textContent = task.title;
            let todoDue = document.createElement('p');
            todoDue.classList.add('due');
            todoDue.textContent = task.due;
            details.appendChild(todoTitle);
            details.appendChild(todoDue);

            let addDelete = document.createElement('div');
            addDelete.classList.add('add-delete');
            let trash = document.createElement('button');
            trash.innerHTML = `<svg index=${taskList.indexOf(task)} loaded=${projId} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path index=${taskList.indexOf(task)} loaded=${projId} d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>`;
            trash.setAttribute("index", taskList.indexOf(task));
            trash.setAttribute("loaded", projId);
            trash.addEventListener("click", deleteTask);
            trash.children[0].addEventListener("click", deleteTask);
            
            const edit = document.createElement('button');
            edit.innerHTML = `<svg index=${taskList.indexOf(task)} loaded=${projId} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path index=${taskList.indexOf(task)} loaded=${projId} d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>`;
            edit.setAttribute("index", taskList.indexOf(task));
            edit.setAttribute("loaded", projId);
            edit.children[0].addEventListener("click", (event) => {
                const editButton = document.querySelector('#edit .button-action > button:first-child');
                console.log(editButton);
                editButton.setAttribute("loaded", projId);
                editButton.setAttribute("index", taskList.indexOf(task))
                const dialogLS = document.querySelector('dialog:nth-of-type(2)');
                overwriteInput(event);
                dialogLS.showModal();
            });

            addDelete.appendChild(trash);
            addDelete.appendChild(edit);
            
            todoItem.appendChild(checkmark);
            todoItem.appendChild(details);
            todoItem.appendChild(addDelete);

            if(task.done === "1") {
                checkbox.checked = true;
                todoItem.style.backgroundColor = "gray";
            }
            else if(task.done === "0")
                checkbox.checked = false;

            todoContainer.appendChild(todoItem);
        }
    }
}

export function markDone(event) {
    if(event.target.checked == false) return;
    const todoItem = event.target.parentElement.parentElement;
    todoItem.style.backgroundColor = "gray";
    modifyDone(event);
}

export function markNotDone(event) {
    if(event.target.checked == true) return;
    const todoItem = event.target.parentElement.parentElement;
    todoItem.style.backgroundColor = "#404B69";
    modifyDone(event);
}

export function overwriteInput(event) {
    const editTitle = document.querySelector('input[name="new-task-title"]');
    const editDescription = document.querySelector('input[name="new-task-description"]');
    const newDue = document.querySelector('input[name="new-task-due"]');
    const newPriority = document.querySelector('select[name="new-priority"]');

    const projId = event.target.getAttribute("loaded");
    const index = event.target.getAttribute("index");

    const project = JSON.parse(localStorage.getItem(projId));
    const task = project.tasks[index];

    editTitle.value = task.title;
    editDescription.value = task.description;
    newDue.value = task.due;
    newPriority.value = task.priority;
    console.log("inside overwrite input");
}