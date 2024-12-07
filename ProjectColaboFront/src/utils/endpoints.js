import axios from "axios";

const SERVER = 'http://localhost:5000';

const ENDPOINTS = {
    login: `${SERVER}/login`,
    register: `${SERVER}/register`,
    projects: `${SERVER}/projects`,
    newProject: `${SERVER}/projects/new`
}

export function login(email, password) {
    return axios.post(ENDPOINTS.login, { email, password });
}
export function register(userdata) {
    return axios.post(ENDPOINTS.register, userdata);
}
export function getProjects() {
    return axios.get(ENDPOINTS.projects);
}
export function createProject(project) {
    return axios.post(ENDPOINTS.newProject, project);
}
