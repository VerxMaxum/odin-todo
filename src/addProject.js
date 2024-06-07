let defaultCount = 0;
export function typeProject() {
    const projCont = document.getElementById('projects');

    const project = document.createElement('div');
    project.classList.add('project');

    const newProj = document.createElement('input');
    newProj.type = 'text';
    newProj.name = 'new-project';
    newProj.addEventListener("focusout", enterProject);

    project.appendChild(newProj);
    projCont.appendChild(project);
    newProj.focus();
}

export function enterProject(event) {
    if(event.keyCode !== 13 && event.type !== 'focusout')
        return;
    const project = document.querySelector('.project:last-child');
    const input = document.querySelector('.project > input');

    const projCard = document.createElement('p');
    projCard.classList.add('project-card');

    let title = input.value;
    if(title.trim() === '')
        title = 'Project' + defaultCount;
    projCard.textContent = title;

    const button = document.createElement('button');
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>`;
    console.log("Hello inside enter project");
    console.log("Hello inside if");

    project.replaceChildren();
    project.appendChild(projCard);
    project.appendChild(button);
}