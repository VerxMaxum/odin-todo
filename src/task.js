import { loadSelected } from './ui.js'
export function addTask(event) {
    event.preventDefault();
    const title = document.querySelector('.input-container > input[name="task-title"]');
    const description = document.querySelector('.input-container > input[name="task-description"]');
    const due = document.querySelector('.input-container > input[name="task-due"]');
    const priority = document.querySelector('.input-container > select[name="priority"]');

    const id = event.target.getAttribute('data');

    console.log(event.target);
    console.log("Div id: " + id);

    let project = JSON.parse(localStorage.getItem(id));
    console.log(project);
    project.tasks.push({title:title.value, description:description.value,
                    due:due.value, priority:priority.value});
    localStorage.setItem(id, JSON.stringify(project));
    const dialog1 = document.querySelector('dialog:nth-of-type(1)');
    dialog1.close();
    loadSelected(event);
}

export function deleteTask(event) {
    const index = event.target.getAttribute("index");
    const loaded = event.target.getAttribute("loaded");
    const project = JSON.parse(localStorage.getItem(loaded));
    console.log(index);
    if(index === 0 && project.tasks.length > 1)
        project.tasks = project.tasks.slice(1);
    else if(index === 0 && project.tasks.length === 1)
        project.tasks = project.tasks.pop();
    else if(index === project.tasks.length-1)
        project.tasks = project.tasks.pop();
    else
        project.tasks = project.tasks.slice(0,index).concat(project.tasks.slice(index+1));
    console.log(project.tasks);
    localStorage.setItem(loaded, JSON.stringify(project));
    loadAgain(event);
}

function loadAgain(event) {
    const todoContainer = document.getElementById('todo-container');
    todoContainer.replaceChildren();
    console.log(event.target);
    let projId = event.target.getAttribute("loaded");
    console.log("In ui loadAgain: " + projId);
    const addTask = document.querySelector('.button-action > button:first-child');
    addTask.setAttribute("data", projId);
    var project = JSON.parse(localStorage.getItem(projId));
    if(project !== null) {
        var taskList = project.tasks;
        for(let task of taskList) {
            let todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.setAttribute("index", taskList.indexOf(task));

            let checkmark = document.createElement('div');
            checkmark.classList.add('checkmark');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'done';
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
            trash.addEventListener("click", deleteTask)
            trash.setAttribute("index", taskList.indexOf(task));
            trash.setAttribute("loaded", projId);
            trash.children[0].addEventListener("click", deleteTask);
            let edit = document.createElement('button');
            edit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>`;
            addDelete.appendChild(trash);
            addDelete.appendChild(edit);
            
            todoItem.appendChild(checkmark);
            todoItem.appendChild(details);
            todoItem.appendChild(addDelete);

            todoContainer.appendChild(todoItem);
        }
    }
}