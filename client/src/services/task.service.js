import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/api/task/";

const getAll = () => {
    return axios.get(API_URL + "all", { headers: authHeader() });
};

const get = (id) => {
    return axios.get(API_URL + id, { headers: authHeader() });
};

const create = (title, description, priority, dueDate) => {
    return axios.post(API_URL, {
        title,
        description,
        priority,
        dueDate
    }, { headers: authHeader() });
};

const update = (id, title, description, priority, dueDate, completed) => {
    return axios.put(API_URL + id, {
        id,
        title,
        description,
        priority,
        dueDate,
        completed
    }, { headers: authHeader() });
};

const remove = (id) => {
    return axios.delete(API_URL + id, { headers: authHeader() });
};

const batchRemove = (ids) => {
    return axios.delete(API_URL + ids.join(','), { headers: authHeader() });
};

const updateComplete = (id, completed) => {
    return axios.put(API_URL + id, {
        completed
    }, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    updateComplete,
    remove,
    batchRemove,
};