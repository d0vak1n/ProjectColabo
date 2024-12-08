const SERVER = 'http://localhost:5000';

const ENDPOINTS = {
    login: `${SERVER}/login`,
    register: `${SERVER}/register`,
    projects: `${SERVER}/projects`,
    newProject: `${SERVER}/projects/new`,
    getProfile: `${SERVER}/profile`
}

export async function login(email, password) {
    const response = await fetch(ENDPOINTS.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}
export async function register(userdata) {
    const response = await fetch(ENDPOINTS.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
    });
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        const text = await response.text();
        if (response.ok) {
            return { message: text };
        } else {
            throw new Error(text);
        }
    }
}

export async function getProjects() {
    const response = await fetch(ENDPOINTS.projects, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export async function createProject(project) {
    const response = await fetch(ENDPOINTS.newProject, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    });
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        const text = await response.text();
        if (response.ok) {
            return { message: text, status: 201 };
        } else {
            throw new Error(text);
        }
    }
}

export async function getProfile(token) {
    const response = await fetch(ENDPOINTS.getProfile, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
