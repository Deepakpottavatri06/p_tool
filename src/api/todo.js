// src/api/todo.js
import axios from 'axios';

const API_URL = 'https://p-tool-backend.vercel.app' + '/api/todos';

export const createTodo = async (todo, token) => {
    const config = {
        headers: { Authorization: token }
    };
    return await axios.post(`${API_URL}/create`, todo, config);
};

export const getTodos = async (token) => {
    const config = {
        headers: { Authorization: token }
    };
    return await axios.get(API_URL, config);
};

export const updateTodo = async (id, todo, token) => {
    const config = {
        headers: { Authorization: token }
    };
    return await axios.put(`${API_URL}/${id}`, todo, config);
};

export const deleteTodo = async (id, token) => {
    const config = {
        headers: { Authorization: token }
    };
    return await axios.delete(`${API_URL}/${id}`, config);
};
