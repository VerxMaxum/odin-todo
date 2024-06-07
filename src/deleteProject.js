import { removeLocal } from './storage.js';

export function deleteProject(event) {
    const parent = event.target.parentElement.parentElement.parentElement;
    const id = event.target.parentElement.parentElement.value;
    removeLocal(id);
    const projects = document.getElementById('projects');
    console.log(parent);
    projects.removeChild(parent);
}