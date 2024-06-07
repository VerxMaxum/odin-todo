import { typeProject, enterProject} from './addProject.js';
import { deleteProject } from './deleteProject.js';
import { loadLocal } from './storage.js';

export function control() {
    loadLocal();
    const addProjectButton = document.querySelector('#add-container > button');
    const delProjButtons = Array.from(document.querySelectorAll('.project > button'));

    addProjectButton.addEventListener("click", typeProject);
    delProjButtons.forEach((button) => {
        button.addEventListener("click", deleteProject);
    });

}