import axios from "axios";

const SERVER = 'http://localhost:5000';

const ENDPOINTS = {
    login: `${SERVER}/login`,
    register: `${SERVER}/register`,
    projects: `${SERVER}/projects`
}

export function login(email, password) {
    return axios.post(ENDPOINTS.login, { email, password });
}
export function register(userdata) {
    return axios.post(ENDPOINTS.register, userdata);
}
export function getProjects() {
    return axios.get(`${SERVER}/projects`);
}