import { typeProject, enterProject} from './addProject.js';

export function control() {
    const addProjectButton = document.querySelector('#add-container > button');
    const inputProj = document.querySelector('.project > input');

    addProjectButton.addEventListener("click", typeProject);
    inputProj.addEventListener("keydown", enterProject);
}