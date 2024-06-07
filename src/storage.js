export function storeLocal(project) {
    console.log("executed");
    localStorage.setItem(project.id, JSON.stringify(project));
}

export function removeLocal(id) {
    localStorage.removeItem(id);
}

export function loadProjects() {
    const projects = document.getElementById('projects');
    const keys = Object.keys(localStorage);
    console.log(keys);
    
    for(let i = 0; i < keys.length; i++) {
        let item = JSON.parse(localStorage.getItem(keys[i]));
        
        let project = document.createElement('div');
        project.classList.add('project');
        project.setAttribute("data", keys[i]);
        console.log("Project data: " + project.getAttribute('data'));

        let title = document.createElement('p');
        title.textContent = item.projName;
        project.appendChild(title);

        let button;
        if(keys[i] !== '0') {
            button = document.createElement('button');
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path>
                        </svg>`;
            button.value = item.id;
            project.appendChild(button);
        } else {
            console.log("Inside else load projects: " + keys[i]);
            project.setAttribute("data", "0");
        }
        projects.appendChild(project);
    }
}